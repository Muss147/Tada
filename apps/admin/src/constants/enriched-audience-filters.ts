/**
 * Filtres d'audience enrichis basés sur les données de profil des contributeurs
 * Ces filtres sont utilisés en complément des filtres standards
 */

import type { Filter } from "@/context/audiences-filter-context";
import { PROFILE_ENHANCEMENT_QUESTIONS } from "./profile-enhancement-questions";

/**
 * Groupes de filtres enrichis pour l'interface
 */
export const ENRICHED_FILTER_GROUPS = [
  {
    id: "professional_profile",
    label: "Profil professionnel",
    filters: [
      {
        id: "professional_skills",
        label: "Compétences professionnelles",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "professional_skills"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+&\s+/g, "_").replace(/\s+/g, "_"),
          label: opt,
        })) || [],
      },
      {
        id: "job_sector",
        label: "Secteur d'activité",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "job_sector"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_").replace(/\//g, "_"),
          label: opt,
        })) || [],
      },
    ] as Filter[],
  },
  {
    id: "interests_hobbies",
    label: "Intérêts & Loisirs",
    filters: [
      {
        id: "interests",
        label: "Centres d'intérêt",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "interests"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+&\s+/g, "_").replace(/\s+/g, "_"),
          label: opt,
        })) || [],
      },
    ] as Filter[],
  },
  {
    id: "technical_equipment",
    label: "Équipement technique",
    filters: [
      {
        id: "equipment",
        label: "Équipement disponible",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "equipment"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/>|</g, ""),
          label: opt,
        })) || [],
      },
      {
        id: "languages",
        label: "Langues parlées",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "languages"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/\(/g, "").replace(/\)/g, ""),
          label: opt,
        })) || [],
      },
    ] as Filter[],
  },
  {
    id: "availability_preferences",
    label: "Disponibilité & Préférences",
    filters: [
      {
        id: "availability",
        label: "Créneaux disponibles",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "availability"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/:/g, ""),
          label: opt,
        })) || [],
      },
      {
        id: "participation_frequency",
        label: "Fréquence de participation",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "participation_frequency"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_"),
          label: opt,
        })) || [],
      },
      {
        id: "preferred_mission_duration",
        label: "Durée de mission préférée",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "preferred_mission_duration"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/<|>/g, "").replace(/'/g, "").replace(/1/g, "un"),
          label: opt,
        })) || [],
      },
    ] as Filter[],
  },
  {
    id: "experience_level",
    label: "Niveau d'expérience",
    filters: [
      {
        id: "research_experience",
        label: "Expérience en recherche de marché",
        type: "multiSelect" as const,
        options: PROFILE_ENHANCEMENT_QUESTIONS.find(
          (q) => q.id === "research_experience"
        )?.options?.map((opt) => ({
          value: opt.toLowerCase().replace(/\s+/g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "plus"),
          label: opt,
        })) || [],
      },
    ] as Filter[],
  },
];

/**
 * Helper pour obtenir tous les filtres enrichis dans un format flat
 */
export function getAllEnrichedFilters(): Filter[] {
  return ENRICHED_FILTER_GROUPS.flatMap((group) => group.filters);
}

/**
 * Helper pour obtenir un filtre enrichi par son ID
 */
export function getEnrichedFilterById(filterId: string): Filter | undefined {
  for (const group of ENRICHED_FILTER_GROUPS) {
    const filter = group.filters.find((f) => f.id === filterId);
    if (filter) {
      return filter;
    }
  }
  return undefined;
}

/**
 * Helper pour vérifier si un ID de filtre correspond à un filtre enrichi
 */
export function isEnrichedFilterId(filterId: string): boolean {
  const enrichedFilterIds = getAllEnrichedFilters().map((f) => f.id);
  return enrichedFilterIds.includes(filterId);
}
