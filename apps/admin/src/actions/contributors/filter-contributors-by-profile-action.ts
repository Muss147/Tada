"use server";

import { authActionClient } from "../safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/**
 * Schema pour filtrer les contributeurs selon leurs données de profil enrichies
 */
const filterContributorsByProfileSchema = z.object({
  filters: z.array(
    z.object({
      key: z.string(), // Ex: "professional_skills", "interests", etc.
      values: z.array(z.string()), // Les valeurs recherchées
      operator: z.enum(["contains", "equals"]).default("contains"),
    })
  ),
  logic: z.enum(["AND", "OR"]).default("AND"), // Logique entre les filtres
});

/**
 * Action pour filtrer les contributeurs selon leurs données de profil enrichies
 * Retourne les IDs des contributeurs qui matchent les critères
 */
export const filterContributorsByProfileAction = authActionClient
  .schema(filterContributorsByProfileSchema)
  .metadata({
    name: "filter-contributors-by-profile",
  })
  .action(async ({ parsedInput }) => {
    const { filters, logic } = parsedInput;

    try {
      if (filters.length === 0) {
        // Si aucun filtre, retourner tous les contributeurs
        const allContributors = await prisma.user.findMany({
          where: {
            role: "contributor",
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return {
          success: true,
          contributors: allContributors,
          count: allContributors.length,
        };
      }

      // Construire la requête SQL selon la logique (AND/OR)
      if (logic === "AND") {
        // Logique AND : l'utilisateur doit avoir TOUS les attributs
        let userIds: string[] = [];

        for (let i = 0; i < filters.length; i++) {
          const filter = filters[i];
          
          const usersWithAttribute = await prisma.contributorData.findMany({
            where: {
              key: filter?.key,
              value: {
                in: filter?.values,
              },
            },
            select: {
              userId: true,
            },
            distinct: ["userId"],
          });

          const currentUserIds = usersWithAttribute.map((u: any) => u.userId);

          if (i === 0) {
            userIds = currentUserIds;
          } else {
            // Intersection : garder seulement les IDs qui sont dans les deux listes
            userIds = userIds.filter((id) => currentUserIds.includes(id));
          }

          // Si à un moment on n'a plus d'utilisateurs, on peut arrêter
          if (userIds.length === 0) break;
        }

        // Récupérer les informations complètes des utilisateurs
        const contributors = await prisma.user.findMany({
          where: {
            id: {
              in: userIds,
            },
            role: "contributor",
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return {
          success: true,
          contributors,
          count: contributors.length,
        };
      } else {
        // Logique OR : l'utilisateur doit avoir AU MOINS UN des attributs
        const allUserIds = new Set<string>();

        for (const filter of filters) {
          const usersWithAttribute = await prisma.contributorData.findMany({
            where: {
              key: filter.key,
              value: {
                in: filter.values,
              },
            },
            select: {
              userId: true,
            },
            distinct: ["userId"],
          });

          usersWithAttribute.forEach((u: any) => allUserIds.add(u.userId));
        }

        // Récupérer les informations complètes des utilisateurs
        const contributors = await prisma.user.findMany({
          where: {
            id: {
              in: Array.from(allUserIds),
            },
            role: "contributor",
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return {
          success: true,
          contributors,
          count: contributors.length,
        };
      }
    } catch (error) {
      console.error("Error filtering contributors by profile:", error);
      throw new Error("Erreur lors du filtrage des contributeurs");
    }
  });

/**
 * Action pour obtenir les contributeurs avec une capacité spécifique
 * (Helper simplifié pour des cas d'usage courants)
 */
export const getContributorsWithSkillAction = authActionClient
  .schema(
    z.object({
      skill: z.string(),
    })
  )
  .metadata({
    name: "get-contributors-with-skill",
  })
  .action(async ({ parsedInput }) => {
    const { skill } = parsedInput;

    const contributors = await prisma.contributorData.findMany({
      where: {
        key: "professional_skills",
        value: {
          contains: skill,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      distinct: ["userId"],
    });

    return {
      success: true,
      contributors: contributors.map((c: any) => c.user),
      count: contributors.length,
    };
  });
