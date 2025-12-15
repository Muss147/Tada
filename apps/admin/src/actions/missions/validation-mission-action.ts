// src/actions/missions/validation-mission-action.ts
"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/safe-action";
import { z } from "zod";

const validationSchema = z.object({
  missionId: z.string().min(1, "ID de mission requis."),
  validationStatus: z.enum(["approved", "rejected", "modification_requested"]),
  comment: z.string().optional(),
});

export const validateMissionAction = action
  .schema(validationSchema)
  .action(async ({ parsedInput }) => {
    const { missionId, validationStatus, comment } = parsedInput;

    const updatedMission = await prisma.tempMission.update({
      where: { id: missionId },
      data: {
        status:
          validationStatus === "approved"
            ? "ready_for_publish"
            : validationStatus === "rejected"
              ? "rejected"
              : "modification_needed",
        validationComment: comment,
        validatedAt: new Date(),
      },
    });

    return { mission: updatedMission };
  });
