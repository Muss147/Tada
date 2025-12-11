import { image } from "@uiw/react-markdown-editor";
import { z } from "zod";

const MediaTypeEnum = z.enum(["photo", "video", "audio"]);
const GpsModeEnum = z.enum(["pin", "navigate", "checkin"]);
const ImageChoiceSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  imageUrl: z.string(), // si tu veux tu peux mettre .url() après
  description: z.string().optional(),
});

export const createMissionSchema = z.object({
  name: z.string().min(1),
  problemSummary: z.string().min(1),
  objectives: z.string().min(1),
  assumptions: z.string().min(1),
  workspaceId: z.string(),
  templateId: z.string().nullable().optional(),
  mode: z.enum(["template", "manual", "ai", "survey"]).nullable().optional(),
  audiences: z.record(z.string(), z.any()),
  image: z.string().optional().nullable(),

  // 🆕 Brief enrichi
  sampleSummary: z.string().optional().nullable(),
  targetSampleSize: z.coerce.number().int().optional().nullable(),
  preliminaryRecommendations: z.string().optional().nullable(),
  studyStructure: z.string().optional().nullable(),
});

export const regenerateSurveysAISchema = z.object({
  problemSummary: z.string().min(1),
  objectives: z.string().min(1),
  assumptions: z.string().min(1),
  audiences: z.record(z.string(), z.any()),
  surveyId: z.string(),
});

export const addQuestionAISchema = z.object({
  problemSummary: z.string().min(1),
  objectives: z.string().min(1),
  assumptions: z.string().min(1),
  audiences: z.record(z.string(), z.any()),
  surveyId: z.string(),
  userPrompt: z.string().min(1),
});

export const generateExecutiveSummarySchema = z.object({
  missionId: z.string(),
  responses: z.any(),
});

export const SurveyQuestionSchema = z.object({
  //
  // Base (SurveyJS / question générique)
  //
  type: z.string(),              // ex: "radiogroup", "checkbox", "rating", "file", "matrix", "text", ...
  name: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
  imageChoices: z.array(ImageChoiceSchema).optional(), // pour les questions de type image_ranking

  //
  // Catégorie logique (pour l'IA et ton form builder)
  //
  category: z
    .enum([
      "single_choice",      // QCM / choix unique
      "multiple_choice",    // choix multiples
      "likert",             // échelle d’accord
      "numeric_scale",      // échelle numérique
      "slider",             // curseur
      "matrix",             // matrice multi-dimensionnelle
      "open",               // question ouverte
      "rating",             // étoiles / notes
      "image_ranking",      // classement d’images
      "media",              // question média (photo / vidéo / audio)
      "gps",                // question GPS / déplacement
      "section",            // titre de section / groupe de questions
    ])
    .optional(),

  //
  // CHOIX (QCM / multi / ranking)
  //
  choices: z.array(z.string()).optional(),
  allowMultiple: z.boolean().optional(),       // choix multiples vs unique
  randomizeChoices: z.boolean().optional(),    // randomisation
  hasOther: z.boolean().optional(),
  otherText: z.string().optional(),

  //
  // ÉCHELLES / RATING / LIKERT / SLIDER
  //
  rateMin: z.number().optional(),
  rateMax: z.number().optional(),
  rateStep: z.number().optional(),
  minRateDescription: z.string().optional(),
  maxRateDescription: z.string().optional(),
  displayRateDescriptionsAsExtremes: z.boolean().optional(),
  displayMode: z.enum(["auto", "buttons", "dropdown"]).optional(),

  //
  // NUMÉRIQUE / INPUT
  //
  inputType: z.string().optional(), // "number", "text", "email", etc.
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  placeholder: z.string().optional(),
  maxLength: z.number().optional(),

  //
  // MATRICE / CLASSEMENT
  //
  rows: z.array(z.string()).optional(),          // lignes de matrice ou items à classer
  columns: z.array(z.string()).optional(),       // colonnes de matrice
  allowRowReorder: z.boolean().optional(),       // classement glissé-déposé

  //
  // 📸 Questions MÉDIA (US-AC-021)
  //
  mediaTypes: z.array(MediaTypeEnum).optional(), // ["photo"] ou ["photo","video"]...
  maxDurationSeconds: z.number().optional(),     // pour vidéo / audio
  maxSizeMb: z.number().optional(),
  maxFiles: z.number().optional(),               // nombre max de fichiers
  captureRequired: z.boolean().optional(),       // ex: photo prise en direct obligatoire

  //
  // 📍 Questions GPS (US-AC-022)
  //
  gpsMode: GpsModeEnum.optional(),               // "pin" | "navigate" | "checkin"
  targetLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
      label: z.string().optional(),
    })
    .optional(),
  maxDistanceMeters: z.number().optional(),
  minTimeOnSiteSeconds: z.number().optional(),
  requiresPathTracking: z.boolean().optional(),  // suivre le déplacement (optionnel)
  gpsToleranceMeters: z.number().optional(),

  //
  // Logique conditionnelle / visibilité
  //
  visibleIf: z.string().optional(),              // expression SurveyJS
  enableIf: z.string().optional(),
  requiredIf: z.string().optional(),

  //
  // Groupes / sections
  //
  isSectionTitle: z.boolean().optional(),
  sectionId: z.string().optional(),
  sectionTitle: z.string().optional(),
});

export const updateSurveyQuestionsSchema = z.object({
  surveyId: z.string(),
  questions: z.any(),
});

export const missionForValidationSchema = z.object({
  missionId: z.string(),
  name: z.string(),
  problemSummary: z.string().optional().nullable(),
  objectives: z.string().optional().nullable(),
  assumptions: z.string().optional().nullable(),
  status: z
    .enum(["draft", "live", "paused", "cancelled", "complete", "on hold"])
    .optional()
    .nullable(),
  workspaceId: z.string().optional(),
  revalidateRoute: z.string().optional().nullable(),
  audiences: z.record(z.string(), z.any()),
});

export const updateMissionSchema = z.object({
  missionId: z.string(),
  name: z.string().optional().nullable(),
  problemSummary: z.string().optional().nullable(),
  objectives: z.string().optional().nullable(),
  assumptions: z.string().optional().nullable(),
  status: z
    .enum(["draft", "live", "paused", "cancelled", "complete", "on hold"])
    .optional()
    .nullable(),
  revalidateRoute: z.string().optional().nullable(),
});

export const updateMissionPermissionsSchema = z.object({
  orgId: z.string().min(1, "ID d'organisation requis"),
  missionId: z.string().min(1, "ID de mission requis"),
  isPublic: z.boolean(),
  authorizedUserIds: z.array(z.string()).default([]),
});

export const getMissionPermissionsSchema = z.object({
  missionId: z.string().min(1, "ID de mission requis"),
});

export type UpdateMissionPermissionsInput = z.infer<
  typeof updateMissionPermissionsSchema
>;
export type GetMissionPermissionsInput = z.infer<
  typeof getMissionPermissionsSchema
>;

export const duplicateMissionSchema = z.object({
  missionId: z.string().uuid(),
});

export const createBillingInfoSchema = z.object({
  organizationId: z.string(),
  credits: z.number().int().min(0),
  street: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  country: z.string(),
  company: z.string(),
  civility: z.enum(["m", "f", "other"]).optional(),
  firstName: z.string(),
  lastName: z.string(),
  acceptTerms: z.boolean(),
});
