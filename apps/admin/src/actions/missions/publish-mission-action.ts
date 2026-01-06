"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "../safe-action";
import { publishMissionSchema } from "./schema";
import { generateMissionChartsAction } from "./generate-mission-charts-action";

export const publishMissionAction = authActionClient
  .schema(publishMissionSchema)
  .metadata({
    name: "publish-mission-action",
  })
  .action(async ({ parsedInput }) => {
    try {
      const { missionId, isPublish, status } = parsedInput;

      // 1️⃣ Publication de la mission
      const mission = await prisma.mission.update({
        where: { id: missionId },
        data: {
          isPublish,
          publishAt: isPublish ? new Date() : null,
          status,
        },
      });

      // 2️⃣ Génération automatique des graphiques UNIQUEMENT si la mission passe en "live"
      const existingCharts = await prisma.missionChart.count({
        where: { missionId },
      });

      if (isPublish && status === "live" && existingCharts === 0) {
        try {
          const chartsResult = await generateMissionChartsAction({
            missionId,
          });

          if (chartsResult?.data?.success) {
            console.log(
              `📊 Graphiques générés automatiquement : ${chartsResult.data?.data?.chartsGenerated} graphiques créés`
            );
          } else {
            console.error(
              "❌ Erreur lors de la génération des graphiques :",
              chartsResult?.data?.error
            );
          }
        } catch (chartError) {
          console.error(
            "❌ Exception lors de la génération des graphiques :",
            chartError
          );
          // ⚠️ Important : ne pas faire échouer la publication
        }
      }

      return { success: true, data: mission };
    } catch (error) {
      console.error("[PUBLISH_MISSION_ERROR]", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      };
    }
  });