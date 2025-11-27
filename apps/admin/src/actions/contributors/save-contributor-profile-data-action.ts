"use server";

import { authActionClient } from "../safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/**
 * Schema pour sauvegarder les données de profil d'un contributeur
 */
const saveContributorProfileDataSchema = z.object({
  userId: z.string().uuid(),
  missionId: z.string().uuid(),
  profileData: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      questionType: z.string().optional(),
      originalQuestion: z.string().optional(),
    })
  ),
});

/**
 * Action pour sauvegarder les données de profil enrichies d'un contributeur
 * Ces données proviennent des missions de type "profile_enhancement"
 */
export const saveContributorProfileDataAction = authActionClient
  .schema(saveContributorProfileDataSchema)
  .metadata({
    name: "save-contributor-profile-data",
  })
  .action(async ({ parsedInput }) => {
    const { userId, missionId, profileData } = parsedInput;

    try {
      // Utiliser une transaction pour garantir l'atomicité
      const result = await prisma.$transaction(async (tx: any) => {
        // Supprimer les anciennes données pour cette combinaison mission/user/key
        // pour éviter les doublons
        const keys = profileData.map((d: { key: string }) => d.key);
        
        await tx.contributorData.deleteMany({
          where: {
            missionId,
            userId,
            key: {
              in: keys,
            },
          },
        });

        // Créer les nouvelles données
        const createdData = await tx.contributorData.createMany({
          data: profileData.map((data: any) => ({
            userId,
            missionId,
            key: data.key,
            value: data.value,
            questionType: data.questionType,
            originalQuestion: data.originalQuestion,
          })),
        });

        return createdData;
      });

      // Revalider le cache des contributeurs
      revalidatePath("/contributors");
      revalidatePath(`/contributors/${userId}`);
      revalidatePath("/missions");

      return {
        success: true,
        count: result.count,
        message: `${result.count} données de profil sauvegardées avec succès`,
      };
    } catch (error) {
      console.error("Error saving contributor profile data:", error);
      throw new Error("Erreur lors de la sauvegarde des données de profil");
    }
  });
