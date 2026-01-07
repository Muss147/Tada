"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import { generateMissionChartsAction } from "./generate-mission-charts-action";

/* ------------------ Schema ------------------ */
const updateMissionDetailsSchema = z.object({
  missionId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  gain: z.number().optional(),
  duration: z.number().optional(),
  deadline: z.date().nullable().optional(),
  targetSampleSize: z.number().optional(),
  imageUrl: z.string().nullable().optional(),
});

/* ------------------ Safe Action interne ------------------ */
const _updateMissionDetailsAction = authActionClient
  .schema(updateMissionDetailsSchema)
  .metadata({
    name: "update-mission-details-action",
  })
  .action(async ({ parsedInput }) => {
    const mission = await prisma.$transaction(async (tx) => {
      await tx.mission.update({
        where: { id: parsedInput.missionId },
        data: {
          name: parsedInput.title,
        },
      });

      return tx.missionConfigContributor.update({
        where: { missionId: parsedInput.missionId },
        data: {
          title: parsedInput.title,
          description: parsedInput.description,
          gain:
            parsedInput.gain !== undefined
              ? BigInt(parsedInput.gain)
              : undefined,
          duration:
            parsedInput.duration !== undefined
              ? BigInt(parsedInput.duration)
              : undefined,
          deadline: parsedInput.deadline,
          targetSampleSize: parsedInput.targetSampleSize,
          imageUrl: parsedInput.imageUrl,
        },
      });
    });

    try {
      await generateMissionChartsAction({
        missionId: parsedInput.missionId,
      });
    } catch (e) {
      console.error("Charts generation failed", e);
    }

    revalidatePath("/[locale]/missions", "page");

    return { success: true, data: mission };
  });

/* ------------------ EXPORT OFFICIEL (Next.js OK) ------------------ */
export async function updateMissionDetailsAction(
  input: z.infer<typeof updateMissionDetailsSchema>
) {
  return _updateMissionDetailsAction(input);
}