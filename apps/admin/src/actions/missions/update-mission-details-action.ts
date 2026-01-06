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
  status: z.enum(["draft", "live"]).optional(),
});

/* ------------------ Safe Action interne ------------------ */
const _updateMissionDetailsAction = authActionClient
  .schema(updateMissionDetailsSchema)
  .metadata({
    name: "update-mission-details-action",
  })
  .action(async ({ parsedInput }) => {
    const mission = await prisma.mission.update({
      where: { id: parsedInput.missionId },
      data: {
        name: parsedInput.title,
        problemSummary: parsedInput.description,
        image: parsedInput.imageUrl,
        targetSampleSize: parsedInput.targetSampleSize,
        status: parsedInput.status,
        updatedAt: new Date(),
      },
    });

    // 🔄 Revalidation
    revalidatePath("/missions");

    // 📊 Génération automatique des graphiques quand la mission passe en live
    if (parsedInput.status === "live") {
      try {
        const chartsResult = await generateMissionChartsAction({
          missionId: parsedInput.missionId,
        });

        if (chartsResult?.data?.success) {
          console.log(
            `Graphiques générés automatiquement: ${chartsResult.data.data.chartsGenerated} graphiques créés`
          );
        } else {
          console.error(
            "Erreur lors de la génération des graphiques:",
            chartsResult?.data?.error
          );
        }
      } catch (chartError) {
        console.error(
          "Erreur lors de la génération des graphiques:",
          chartError
        );
        // ❗ On n’échoue PAS l’action principale
      }
    }

    return { success: true, data: mission };
  });

/* ------------------ EXPORT OFFICIEL (Next.js OK) ------------------ */
export async function updateMissionDetailsAction(
  input: z.infer<typeof updateMissionDetailsSchema>
) {
  return _updateMissionDetailsAction(input);
}