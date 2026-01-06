"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { authActionClient } from "@/actions/safe-action";
import { generateMissionBriefAISchema } from "../missions/schema";

export const generateMissionBriefAIAction = authActionClient
  .schema(generateMissionBriefAISchema)
  .metadata({ name: "generate-mission-brief-ai" })
  .action(async ({ parsedInput, ctx }) => {
    // ctx.user est GARANTI ici
    const { user } = ctx;

    const { transcript, currentBrief, audiences } = parsedInput;

    const systemPrompt = `Tu es un expert en études de marché.
Tu transformes une conversation en un brief d’étude clair, structuré et exploitable.

Contraintes STRICTES :
- Réponds uniquement avec un JSON valide
- Aucun texte avant ou après le JSON
- Ton professionnel, clair, orienté business
- Ne dis jamais que tu es une IA`;

    const prompt = `
Conversation:
${transcript}

Audiences:
${JSON.stringify(audiences, null, 2)}

Current brief (may be incomplete):
${JSON.stringify(currentBrief, null, 2)}

Expected JSON format:
{
  "name": string,
  "problemSummary": string,
  "objectives": string,
  "assumptions": string,
  "sampleSummary": string,
  "targetSampleSize": number | null,
  "preliminaryRecommendations": string,
  "studyStructure": string
}
`;

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt,
      temperature: 0.3,
    });

    let parsed: any;
    try {
      parsed = JSON.parse(result.text);
    } catch (e) {
      console.error("❌ Invalid AI JSON:", result.text);
      throw new Error("INVALID_AI_RESPONSE");
    }

    return {
      data: {
        name: parsed.name ?? currentBrief.name ?? "",
        problemSummary: parsed.problemSummary ?? "",
        objectives: parsed.objectives ?? "",
        assumptions: parsed.assumptions ?? "",
        sampleSummary: parsed.sampleSummary ?? "",
        targetSampleSize:
          typeof parsed.targetSampleSize === "number"
            ? parsed.targetSampleSize
            : null,
        preliminaryRecommendations:
          parsed.preliminaryRecommendations ?? "",
        studyStructure: parsed.studyStructure ?? "",
      },
    };
  });