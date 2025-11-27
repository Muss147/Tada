/**
 * Types et constantes pour le système de filtrage d'audience avancé
 */

/**
 * Opérateurs disponibles pour les filtres
 */
export const FILTER_OPERATORS = {
  EQUALS: "equals",
  NOT_EQUALS: "not_equals",
  IN: "in",
  NOT_IN: "not_in",
  CONTAINS: "contains",
  NOT_CONTAINS: "not_contains",
  GREATER_THAN: "greater_than",
  LESS_THAN: "less_than",
  BETWEEN: "between",
  EXISTS: "exists",
  NOT_EXISTS: "not_exists",
} as const;

export type FilterOperator =
  (typeof FILTER_OPERATORS)[keyof typeof FILTER_OPERATORS];

/**
 * Labels des opérateurs pour l'interface
 */
export const FILTER_OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: "est égal à",
  not_equals: "n'est pas égal à",
  in: "est l'un de",
  not_in: "n'est pas l'un de",
  contains: "contient",
  not_contains: "ne contient pas",
  greater_than: "est supérieur à",
  less_than: "est inférieur à",
  between: "est entre",
  exists: "existe",
  not_exists: "n'existe pas",
};

/**
 * Types de champs disponibles pour le filtrage
 */
export const AUDIENCE_FILTER_FIELDS = {
  // Filtres standards (déjà existants)
  AGE: "age",
  GENDER: "gender",
  LOCATION: "location",
  COUNTRY: "country",
  SECTOR: "sector",

  // Filtres enrichis (depuis ContributorData)
  PROFESSIONAL_SKILLS: "professional_skills",
  JOB_SECTOR: "job_sector",
  INTERESTS: "interests",
  EQUIPMENT: "equipment",
  LANGUAGES: "languages",
  AVAILABILITY: "availability",
  RESEARCH_EXPERIENCE: "research_experience",
  PARTICIPATION_FREQUENCY: "participation_frequency",
  PREFERRED_MISSION_DURATION: "preferred_mission_duration",
} as const;

export type AudienceFilterField =
  (typeof AUDIENCE_FILTER_FIELDS)[keyof typeof AUDIENCE_FILTER_FIELDS];

/**
 * Labels des champs de filtre
 */
export const AUDIENCE_FILTER_FIELD_LABELS: Record<
  AudienceFilterField,
  string
> = {
  age: "Âge",
  gender: "Genre",
  location: "Localisation",
  country: "Pays",
  sector: "Secteur",
  professional_skills: "Compétences professionnelles",
  job_sector: "Secteur d'activité",
  interests: "Centres d'intérêt",
  equipment: "Équipement disponible",
  languages: "Langues parlées",
  availability: "Disponibilités",
  research_experience: "Expérience en recherche",
  participation_frequency: "Fréquence de participation",
  preferred_mission_duration: "Durée de mission préférée",
};

/**
 * Catégories de filtres pour l'organisation de l'UI
 */
export const FILTER_CATEGORIES = {
  DEMOGRAPHICS: "demographics",
  PROFILE: "profile",
  PROFESSIONAL: "professional",
  INTERESTS: "interests",
  TECHNICAL: "technical",
  AVAILABILITY: "availability",
} as const;

export type FilterCategory =
  (typeof FILTER_CATEGORIES)[keyof typeof FILTER_CATEGORIES];

export const FILTER_CATEGORY_LABELS: Record<FilterCategory, string> = {
  demographics: "Démographiques",
  profile: "Profil général",
  professional: "Professionnel",
  interests: "Intérêts & Passions",
  technical: "Technique & Équipement",
  availability: "Disponibilité",
};

/**
 * Mapping des champs vers leurs catégories
 */
export const FIELD_TO_CATEGORY: Record<AudienceFilterField, FilterCategory> = {
  age: FILTER_CATEGORIES.DEMOGRAPHICS,
  gender: FILTER_CATEGORIES.DEMOGRAPHICS,
  location: FILTER_CATEGORIES.DEMOGRAPHICS,
  country: FILTER_CATEGORIES.DEMOGRAPHICS,
  sector: FILTER_CATEGORIES.PROFILE,
  professional_skills: FILTER_CATEGORIES.PROFESSIONAL,
  job_sector: FILTER_CATEGORIES.PROFESSIONAL,
  interests: FILTER_CATEGORIES.INTERESTS,
  equipment: FILTER_CATEGORIES.TECHNICAL,
  languages: FILTER_CATEGORIES.TECHNICAL,
  availability: FILTER_CATEGORIES.AVAILABILITY,
  research_experience: FILTER_CATEGORIES.PROFILE,
  participation_frequency: FILTER_CATEGORIES.AVAILABILITY,
  preferred_mission_duration: FILTER_CATEGORIES.AVAILABILITY,
};

/**
 * Types de données pour chaque champ
 */
export type FilterValueType = "string" | "number" | "array" | "boolean" | "range";

export const FIELD_VALUE_TYPES: Record<AudienceFilterField, FilterValueType> = {
  age: "range",
  gender: "string",
  location: "string",
  country: "string",
  sector: "string",
  professional_skills: "array",
  job_sector: "string",
  interests: "array",
  equipment: "array",
  languages: "array",
  availability: "array",
  research_experience: "string",
  participation_frequency: "string",
  preferred_mission_duration: "array",
};

/**
 * Opérateurs disponibles par type de valeur
 */
export const OPERATORS_BY_VALUE_TYPE: Record<FilterValueType, FilterOperator[]> = {
  string: [
    FILTER_OPERATORS.EQUALS,
    FILTER_OPERATORS.NOT_EQUALS,
    FILTER_OPERATORS.IN,
    FILTER_OPERATORS.NOT_IN,
    FILTER_OPERATORS.CONTAINS,
  ],
  number: [
    FILTER_OPERATORS.EQUALS,
    FILTER_OPERATORS.NOT_EQUALS,
    FILTER_OPERATORS.GREATER_THAN,
    FILTER_OPERATORS.LESS_THAN,
    FILTER_OPERATORS.BETWEEN,
  ],
  array: [
    FILTER_OPERATORS.IN,
    FILTER_OPERATORS.NOT_IN,
    FILTER_OPERATORS.CONTAINS,
    FILTER_OPERATORS.NOT_CONTAINS,
  ],
  boolean: [FILTER_OPERATORS.EQUALS],
  range: [
    FILTER_OPERATORS.EQUALS,
    FILTER_OPERATORS.GREATER_THAN,
    FILTER_OPERATORS.LESS_THAN,
    FILTER_OPERATORS.BETWEEN,
  ],
};

/**
 * Structure d'un filtre d'audience
 */
export interface AudienceFilter {
  id: string; // ID unique du filtre
  field: AudienceFilterField;
  operator: FilterOperator;
  value: string | string[] | number | { min: number; max: number };
  label?: string; // Label personnalisé pour l'affichage
}

/**
 * Groupe de filtres avec logique AND/OR
 */
export interface FilterGroup {
  id: string;
  logic: "AND" | "OR";
  filters: AudienceFilter[];
}

/**
 * Configuration complète des filtres d'audience
 */
export interface AudienceFilterConfig {
  groups: FilterGroup[];
  globalLogic: "AND" | "OR"; // Logique entre les groupes
}

/**
 * Résultat du calcul de filtrage
 */
export interface FilterResult {
  totalContributors: number;
  matchedContributors: number;
  matchedPercentage: number;
  contributorIds: string[];
}

/**
 * Champs standards (non enrichis)
 */
const STANDARD_FIELDS = [
  AUDIENCE_FILTER_FIELDS.AGE,
  AUDIENCE_FILTER_FIELDS.GENDER,
  AUDIENCE_FILTER_FIELDS.LOCATION,
  AUDIENCE_FILTER_FIELDS.COUNTRY,
  AUDIENCE_FILTER_FIELDS.SECTOR,
] as const;

/**
 * Helper pour vérifier si un champ est un filtre enrichi
 */
export function isEnrichedFilter(field: AudienceFilterField): boolean {
  return !STANDARD_FIELDS.includes(field as any);
}

/**
 * Helper pour obtenir les opérateurs disponibles pour un champ
 */
export function getAvailableOperators(
  field: AudienceFilterField
): FilterOperator[] {
  const valueType = FIELD_VALUE_TYPES[field];
  return OPERATORS_BY_VALUE_TYPE[valueType];
}

/**
 * Helper pour grouper les champs par catégorie
 */
export function getFieldsByCategory(): Record<
  FilterCategory,
  AudienceFilterField[]
> {
  const grouped: Record<FilterCategory, AudienceFilterField[]> = {
    demographics: [],
    profile: [],
    professional: [],
    interests: [],
    technical: [],
    availability: [],
  };

  for (const [field, category] of Object.entries(FIELD_TO_CATEGORY)) {
    grouped[category].push(field as AudienceFilterField);
  }

  return grouped;
}
