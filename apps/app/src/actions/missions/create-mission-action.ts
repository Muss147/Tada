// src/actions/missions/create-mission-action.ts
"use server";

import { prisma } from "@/lib/prisma";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import { promptSystem } from "./constant";
import { SurveyQuestionSchema, createMissionSchema } from "./schema";

const REQUIRED_MIN = {
  single_choice: 2,
  multiple_choice: 2,
  open: 1,
  matrix: 1,
  boolean: 1,
};

const hasScale = (t: string) =>
  ["likert", "rating", "numeric_scale", "slider"].includes(t);

/**
 * IMPORTANT:
 * - Pas de z.union ici, car ça peut produire un JSON Schema invalide pour /v1/responses.
 * - On accepte 2 formats de sortie possibles du modèle:
 *   (A) { title, description, elements: [...] }  (format SurveyJS "full")
 *   (B) { questions: [...] }                    (format legacy interne)
 * - Racine DOIT être type: "object"
 */
const SurveyResultSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    elements: z.array(SurveyQuestionSchema).optional(),
    questions: z.array(SurveyQuestionSchema).optional(),
  })
  .refine(
    (v) => (v.elements?.length ?? 0) > 0 || (v.questions?.length ?? 0) > 0,
    { message: "Model must return either `elements` or `questions`.", path: ["elements"] }
  )
  .superRefine((v, ctx) => {
    const qs = v.elements?.length ? v.elements : v.questions ?? [];

    const count = new Map<string, number>();
    for (const q of qs) count.set(q.type, (count.get(q.type) ?? 0) + 1);

    for (const [k, min] of Object.entries(REQUIRED_MIN)) {
      if ((count.get(k) ?? 0) < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Coverage missing: need at least ${min} "${k}" questions.`,
          path: ["questions"],
        });
      }
    }

    const scaleCount = qs.filter((q) => hasScale(q.type)).length;
    if (scaleCount < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Coverage missing: need at least 2 scale questions among likert/rating/numeric_scale/slider.`,
        path: ["questions"],
      });
    }

    const hasRanking = qs.some((q) => q.type === "ranking" || q.type === "image_ranking");
    if (!hasRanking) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Coverage missing: need at least 1 ranking or image_ranking.`,
        path: ["questions"],
      });
    }
  });

function normalizeQuestions(obj: z.infer<typeof SurveyResultSchema>) {
  const questions = obj.elements?.length ? obj.elements : obj.questions ?? [];
  return {
    title: obj.title,
    description: obj.description,
    questions,
  };
}

export const createMissionAction = authActionClient
  .schema(createMissionSchema)
  .metadata({ name: "create-mission-action" })
  .action(
    async ({
      parsedInput: {
        templateId,
        name,
        problemSummary,
        objectives,
        assumptions,
        audiences,
        workspaceId,
        mode,
        image,
        sampleSummary,
        targetSampleSize,
        preliminaryRecommendations,
        studyStructure,
      },
    }) => {
      let template: any = null;
      let surveyQuestions: any = null;

      try {
        // 1) Create mission
        const mission = await prisma.mission.create({
          data: {
            name,
            problemSummary,
            objectives,
            assumptions,
            status: "draft",
            audiences,
            internal: true,
            mode: mode ?? "manual",
            ...(image ? { image } : {}),
            ...(workspaceId ? { workspace: { connect: { id: workspaceId } } } : {}),
            sampleSummary,
            targetSampleSize,
            preliminaryRecommendations,
            studyStructure,
          },
        });

        console.log("[CREATE_MISSION_ACTION] created mission =", mission);

        // 2) Generate survey if AI or template
        if (mode && mode !== "manual") {
          if (templateId) {
            template = await prisma.template.findUnique({
              where: { id: templateId },
              include: { organization: true },
            });

            if (!template) {
              return { success: false, data: null, message: "Template not found" };
            }

            surveyQuestions = template.questions;
          } else {
            const prompt = `
              Mission title: ${name}

              Problem: ${problemSummary}
              Objectives: ${objectives}
              Hypotheses/Assumptions: ${assumptions}

              Audiences (JSON): ${JSON.stringify(audiences ?? {}, null, 2)}

              Hard constraints:
              - Output MUST be valid JSON only. No markdown. No extra keys outside the schema.
              - Return either:
                (A) { "title": "...", "description": "...", "elements": [ ... ] }
                OR
                (B) { "questions": [ ... ] }
              - Allowed question types (use ONLY these values for "type"):
                single_choice, multiple_choice, likert, numeric_scale, slider, rating, open, matrix,
                ranking, image_ranking, media, heatmap, gps, boolean, section.
                
              Coverage requirements (VERY IMPORTANT):
              - Generate 15–20 questions.
              - MUST include at least:
                - 2 single_choice
                - 2 multiple_choice
                - 2 among (likert, rating, numeric_scale, slider)
                - 1 open
                - 1 matrix (with rows+columns)
                - 1 ranking OR image_ranking
                - 1 boolean
              - Include media and/or heatmap and/or gps ONLY if relevant to the mission context (0–2 total max).
              - If you output more than 10 questions, include 1–2 "section" items to structure the questionnaire.

              Field rules:
              - Always set "category" = "type".
              - For single_choice/multiple_choice/ranking: provide choices (4–8 items).
              - For matrix: provide rows (3–6) and columns (3–6).
              - For likert/rating: provide rateMin/rateMax and labels when appropriate.
              - For numeric_scale/slider: provide min/max/step.
              - For image_ranking: provide imageChoices with placeholder imageUrl if needed.
              `;

            const { object } = await generateObject({
              model: openai("gpt-4o-mini"),
              schema: SurveyResultSchema,
              system: promptSystem,
              prompt,
            });

            const normalized = normalizeQuestions(object);
            const questions = normalized.questions ?? [];

            // Business rule: min 10
            if (!questions.length || questions.length < 10) {
              console.error(
                "[CREATE_MISSION_ACTION] Not enough questions generated:",
                questions.length
              );
              return {
                success: false,
                error: `L'IA n'a généré que ${questions.length} questions, il en faut au moins 10.`,
              };
            }

            // Paginate in SurveyJS pages (10 per page)
            const PAGE_SIZE = 10;
            const pages: any[] = [];
            for (let i = 0; i < questions.length; i += PAGE_SIZE) {
              const pageIndex = pages.length + 1;
              pages.push({
                name: `page${pageIndex}`,
                elements: questions.slice(i, i + PAGE_SIZE),
              });
            }

            surveyQuestions = {
              title: normalized.title ?? name,
              description: normalized.description ?? "",
              pages,
            };
          }

          await prisma.survey.create({
            data: {
              name,
              missionId: mission.id,
              questions: surveyQuestions as any,
              description: "Survey description",
            },
          });
        }

        return { success: true, data: mission, message: "success" };
      } catch (error: any) {
        console.error("[CREATE_MISSION_ERROR RAW]", error);
        console.error(
          "[CREATE_MISSION_ERROR SERIALIZED]",
          JSON.stringify(
            {
              name: error?.name,
              message: error?.message,
              code: error?.code,
              meta: error?.meta,
            },
            null,
            2
          )
        );

        return {
          success: false,
          error: error instanceof Error ? error.message : "Une erreur est survenue",
        };
      }
    }
  );
