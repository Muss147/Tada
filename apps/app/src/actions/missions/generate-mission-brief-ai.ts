"use server";

import { authActionClient } from "../safe-action";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const generateMissionBriefInputSchema = z.object({
  name: z.string().optional(),
  problemSummary: z.string().optional(),
  objectives: z.string().optional(),
  assumptions: z.string().optional(),
  audiences: z.record(z.string(), z.any()).optional(),
});

const MissionBriefSchema = z.object({
  name: z.string(),
  problemSummary: z.string(),
  objectives: z.string(),
  assumptions: z.string(),
  sampleSummary: z.string(),
  targetSampleSize: z.number().int().positive().nullable().optional(),
  preliminaryRecommendations: z.string(),
  studyStructure: z.string(),
});

export const generateMissionBriefAIAction = authActionClient
  .schema(generateMissionBriefInputSchema)
  .metadata({
    name: "generate-mission-brief-ai",
  })
  .action(async ({ parsedInput }) => {
    const {
      name,
      problemSummary,
      objectives,
      assumptions,
      audiences,
    } = parsedInput;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: MissionBriefSchema,
      system: `
Tu es Jarvis, un expert en études marketing.
À partir du contexte fourni (problématique, objectifs, hypothèses, audiences),
tu dois produire un brief complet d’étude prêt à être utilisé dans la plateforme Tada.
La langue de sortie doit correspondre à la langue du texte d’entrée (français / anglais, etc.).`,
      prompt: `
Voici le contexte actuel de la mission :

Nom (facultatif) :
${name || "(non défini)"}

Problématique (business problem) :
${problemSummary || "(non défini)"}

Objectifs stratégiques :
${objectives || "(non défini)"}

Hypothèses :
${assumptions || "(non défini)"}

Ciblage (attributs / audiences JSON) :
${JSON.stringify(audiences || {}, null, 2)}

À partir de ce contexte, propose :
- un nom de mission clair,
- une reformulation propre de la problématique,
- des objectifs clairs,
- des hypothèses formulées proprement,
- un résumé de l’échantillon recherché (sampleSummary),
- un volume cible de soumissions (targetSampleSize),
- des recommandations préliminaires,
- une structure générale de l’étude (studyStructure) structurée par grandes étapes.
`,
    });

    return {
      success: true,
      data: object,
    };
  });
