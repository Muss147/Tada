/**
 * Types de missions disponibles dans l'application
 */
export const MISSION_TYPES = {
  SURVEY: "survey",
  INTERVIEW: "interview",
  FOCUS_GROUP: "focus_group",
  PROFILE_ENHANCEMENT: "profile_enhancement",
} as const;

export type MissionType = (typeof MISSION_TYPES)[keyof typeof MISSION_TYPES];

/**
 * Labels affichés pour chaque type de mission
 */
export const MISSION_TYPE_LABELS: Record<MissionType, string> = {
  survey: "Sondage",
  interview: "Interview",
  focus_group: "Groupe de discussion",
  profile_enhancement: "Enrichissement de profil",
};

/**
 * Descriptions détaillées pour chaque type de mission
 */
export const MISSION_TYPE_DESCRIPTIONS: Record<MissionType, string> = {
  survey:
    "Collectez des réponses via un questionnaire structuré avec différents types de questions.",
  interview:
    "Organisez des entretiens individuels pour obtenir des insights qualitatifs approfondis.",
  focus_group:
    "Animez des discussions de groupe pour explorer des opinions et comportements collectifs.",
  profile_enhancement:
    "Collectez des informations supplémentaires sur vos contributeurs pour enrichir leur profil et améliorer le ciblage.",
};

/**
 * Icônes associées à chaque type de mission
 */
export const MISSION_TYPE_ICONS: Record<MissionType, string> = {
  survey: "📋",
  interview: "🎤",
  focus_group: "👥",
  profile_enhancement: "✨",
};
