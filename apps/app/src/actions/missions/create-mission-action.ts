// src/actions/missions/create-mission-action.ts
"use server";

import { prisma } from "@/lib/prisma";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import { promptSystem } from "./constant";
import { SurveyQuestionSchema, createMissionSchema } from "./schema";

export const createMissionAction = authActionClient
  .schema(createMissionSchema)
  .metadata({
    name: "create-mission-action",
  })
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
      ctx: { user, auth },
    }) => {
      let template = null;
      let surveyQuestions: any = null;

      try {
        // 1. Créer la mission
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
            ...(workspaceId
              ? {
                  workspace: {
                    connect: { id: workspaceId },
                  },
                }
              : {}),
            sampleSummary,
            targetSampleSize,
            preliminaryRecommendations,
            studyStructure,
          },
        });

        console.log("[CREATE_MISSION_ACTION] created mission =", mission);

        // 2. Génération du survey si mode AI ou template
        if (mode && mode !== "manual") {
          if (templateId) {
            template = await prisma.template.findUnique({
              where: { id: templateId },
              include: { organization: true },
            });

            if (!template) {
              return {
                success: false,
                data: null,
                message: "Template not found",
              };
            }

            surveyQuestions = template.questions;
          } else {
            const { object } = await generateObject({
              model: openai("gpt-4o-mini"),
              schema: z.object({
                questions: z.array(SurveyQuestionSchema),
              }),
              prompt: `Problem: ${problemSummary}
                  Objective: ${objectives}
                  Hypotheses: ${assumptions}
                  audiences: ${audiences}`,
              system: promptSystem,
            });

            const questions = object.questions ?? [];

            // ✅ Contrôle métier : min 20 questions
            if (!questions || questions.length < 10) {
              console.error(
                "[CREATE_MISSION_ACTION] Not enough questions generated:",
                questions.length
              );
              return {
                success: false,
                error: `L'IA n'a généré que ${questions.length} questions, il en faut au moins 10.`,
              };
            }

            // ✅ Pagination en pages SurveyJS (10 questions par page)
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
              title: name,
              description: "",
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
          error:
            error instanceof Error ? error.message : "Une erreur est survenue",
        };
      }
    }
  );
