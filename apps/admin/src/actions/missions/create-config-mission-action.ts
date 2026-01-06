"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "../safe-action";
import { createMissionConfigForContributorsSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createConfigMissionAction = authActionClient
  .schema(createMissionConfigForContributorsSchema)
  .metadata({
    name: "create-config-mission-action",
  })
  .action(async ({ parsedInput }) => {
    try {
      await prisma.missionConfigContributor.deleteMany({
        where: { missionId: parsedInput.missionId },
      });

      const config = await prisma.missionConfigContributor.create({
        data: parsedInput,
      });

      revalidatePath("/missions");
      return { success: true, data: config };
    } catch (error) {
      console.error("[CREATE_MISSION_CONFIG_ERROR]", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      };
    }
  });