"use server";

import { prisma } from "@/lib/prisma";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

// Schéma pour créer un attribut
const createAttributeSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  key: z.string().min(1, "La clé technique est requise"),
  type: z.enum(["text", "number", "select", "multiselect", "date", "boolean", "range"]),
  category: z.enum(["demographics", "profile", "professional", "interests", "technical", "availability"]),
  description: z.string().optional(),
  required: z.boolean().default(false),
  enrichmentOnly: z.boolean().default(false),
  options: z.array(z.string()).optional(),
});

// Schéma pour mettre à jour un attribut
const updateAttributeSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  key: z.string().min(1).optional(),
  type: z.enum(["text", "number", "select", "multiselect", "date", "boolean", "range"]).optional(),
  category: z.enum(["demographics", "profile", "professional", "interests", "technical", "availability"]).optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  enrichmentOnly: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

// Créer un attribut
export const createAttributeAction = action
  .schema(createAttributeSchema)
  .action(async ({ parsedInput }) => {
    try {
      const attribute = await prisma.audienceAttribute.create({
        data: {
          name: parsedInput.name,
          key: parsedInput.key,
          type: parsedInput.type,
          category: parsedInput.category,
          description: parsedInput.description,
          required: parsedInput.required,
          enrichmentOnly: parsedInput.enrichmentOnly,
          options: parsedInput.options ? JSON.stringify(parsedInput.options) : null,
          active: true,
        },
      });

      revalidatePath("/settings/audience-attributes");

      return {
        success: true,
        attribute,
        message: "Attribut créé avec succès",
      };
    } catch (error) {
      console.error("Error creating attribute:", error);
      throw new Error("Erreur lors de la création de l'attribut");
    }
  });

// Mettre à jour un attribut
export const updateAttributeAction = action
  .schema(updateAttributeSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;

    try {
      // Préparer les données à mettre à jour
      const updateData: any = { ...data };
      
      // Convertir les options en JSON si présentes
      if (data.options) {
        updateData.options = JSON.stringify(data.options);
      }

      const attribute = await prisma.audienceAttribute.update({
        where: { id },
        data: updateData,
      });

      revalidatePath("/settings/audience-attributes");

      return {
        success: true,
        attribute,
        message: "Attribut mis à jour avec succès",
      };
    } catch (error) {
      console.error("Error updating attribute:", error);
      throw new Error("Erreur lors de la mise à jour de l'attribut");
    }
  });

// Supprimer un attribut
export const deleteAttributeAction = action
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    try {
      // Vérifier si l'attribut est utilisé dans des missions
      const usageCount = await prisma.mission.count({
        where: {
          enrichmentAttributes: {
            has: parsedInput.id,
          },
        },
      });

      if (usageCount > 0) {
        throw new Error(
          `Cet attribut est utilisé dans ${usageCount} mission(s). Veuillez d'abord les modifier.`
        );
      }

      // Supprimer les valeurs associées
      await prisma.contributorAttributeValue.deleteMany({
        where: { attributeId: parsedInput.id },
      });

      // Supprimer l'attribut
      await prisma.audienceAttribute.delete({
        where: { id: parsedInput.id },
      });

      revalidatePath("/settings/audience-attributes");

      return {
        success: true,
        message: "Attribut supprimé avec succès",
      };
    } catch (error) {
      console.error("Error deleting attribute:", error);
      throw new Error(
        error instanceof Error ? error.message : "Erreur lors de la suppression de l'attribut"
      );
    }
  });

// Récupérer tous les attributs
export const getAttributesAction = action
  .schema(
    z.object({
      category: z.string().optional(),
      enrichmentOnly: z.boolean().optional(),
      active: z.boolean().optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    try {
      const where: any = {};

      if (parsedInput.category) {
        where.category = parsedInput.category;
      }

      if (parsedInput.enrichmentOnly !== undefined) {
        where.enrichmentOnly = parsedInput.enrichmentOnly;
      }

      if (parsedInput.active !== undefined) {
        where.active = parsedInput.active;
      }

      const attributes = await prisma.audienceAttribute.findMany({
        where,
        orderBy: [{ category: "asc" }, { name: "asc" }],
      });

      // Parser les options JSON
      const attributesWithParsedOptions = attributes.map((attr) => ({
        ...attr,
        options: attr.options ? JSON.parse(attr.options as string) : null,
      }));

      return {
        success: true,
        attributes: attributesWithParsedOptions,
      };
    } catch (error) {
      console.error("Error fetching attributes:", error);
      throw new Error("Erreur lors de la récupération des attributs");
    }
  });

// Récupérer un attribut par ID
export const getAttributeByIdAction = action
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    try {
      const attribute = await prisma.audienceAttribute.findUnique({
        where: { id: parsedInput.id },
        include: {
          _count: {
            select: {
              values: true,
            },
          },
        },
      });

      if (!attribute) {
        throw new Error("Attribut non trouvé");
      }

      // Parser les options JSON
      const attributeWithParsedOptions = {
        ...attribute,
        options: attribute.options ? JSON.parse(attribute.options as string) : null,
      };

      return {
        success: true,
        attribute: attributeWithParsedOptions,
      };
    } catch (error) {
      console.error("Error fetching attribute:", error);
      throw new Error("Erreur lors de la récupération de l'attribut");
    }
  });

// Obtenir les statistiques des attributs
export const getAttributeStatsAction = action.action(async () => {
  try {
    const totalAttributes = await prisma.audienceAttribute.count({
      where: { active: true },
    });

    const enrichmentAttributes = await prisma.audienceAttribute.count({
      where: { active: true, enrichmentOnly: true },
    });

    const totalContributors = await prisma.user.count({
      where: { role: "contributor" },
    });

    const contributorsWithValues = await prisma.contributorAttributeValue.groupBy({
      by: ["userId"],
    });

    const enrichedProfiles = contributorsWithValues.length;
    const completionRate = totalContributors > 0 
      ? (enrichedProfiles / totalContributors) * 100 
      : 0;

    return {
      success: true,
      stats: {
        totalAttributes,
        enrichmentAttributes,
        totalContributors,
        enrichedProfiles,
        completionRate: Math.round(completionRate * 10) / 10,
      },
    };
  } catch (error) {
    console.error("Error fetching attribute stats:", error);
    throw new Error("Erreur lors de la récupération des statistiques");
  }
});
