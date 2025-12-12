// src/lib/survey-mapper.ts
import {
  type Survey,
  type SurveyQuestion,
} from "@/context/surveys-builder-context";

const NATIVE_SURVEYJS_TYPES = new Set([
  "text",
  "comment",
  "radiogroup",
  "checkbox",
  "dropdown",
  "rating",
  "matrix",
  "boolean",
  "ranking",
  "file",
  "html",
  "image",
  "imagepicker",
]);

function mapQuestionToSurveyJS(question: SurveyQuestion): any {
  const base = {
    name: question.name,
    title: question.title,
    description: question.description,
    isRequired: question.isRequired ?? false,
    visibleIf: question.visibleIf,
    enableIf: question.enableIf,
    requiredIf: question.requiredIf,
  };

  // 1️⃣ Si la question vient d’un ancien builder déjà en types SurveyJS, on la laisse passer
  if (!question.category && NATIVE_SURVEYJS_TYPES.has(question.type)) {
    return {
      ...question,
      ...base,
    };
  }

  // 2️⃣ Sinon on mappe selon category/type métier
  const category = question.category ?? (question.type as any);

  switch (category) {
    //
    // SINGLE CHOICE → radiogroup
    //
    case "single_choice":
      return {
        ...base,
        type: "radiogroup",
        choices: question.choices ?? [],
        hasOther: question.hasOther ?? false,
        otherText: question.otherText,
      };

    //
    // MULTIPLE CHOICE → checkbox
    //
    case "multiple_choice":
      return {
        ...base,
        type: "checkbox",
        choices: question.choices ?? [],
        hasOther: question.hasOther ?? false,
        otherText: question.otherText,
      };

    //
    // RANKING → ranking
    //
    case "ranking":
      return {
        ...base,
        type: "ranking",
        choices: question.choices ?? [],
      };

    //
    // LIKERT → rating (1–5 avec libellés)
    //
    case "likert":
      return {
        ...base,
        type: "rating",
        rateMin: question.rateMin ?? 1,
        rateMax: question.rateMax ?? 5,
        minRateDescription: question.minRateDescription,
        maxRateDescription: question.maxRateDescription,
        displayRateDescriptionsAsExtremes:
          question.displayRateDescriptionsAsExtremes ?? true,
      };

    //
    // NUMERIC SCALE → rating numérique (1–10 par ex)
    //
    case "numeric_scale":
      return {
        ...base,
        type: "rating",
        rateMin: question.min ?? question.rateMin ?? 1,
        rateMax: question.max ?? question.rateMax ?? 10,
      };

    //
    // SLIDER → rating avec renderAs: "slider"
    //
    case "slider":
      return {
        ...base,
        type: "rating",
        rateMin: question.min ?? 0,
        rateMax: question.max ?? 100,
        step: question.step ?? 1,
        // SurveyJS supporte rating.renderAs = "slider"
        renderAs: "slider",
      };

    //
    // OPEN → comment (texte long)
    //
    case "open":
      return {
        ...base,
        type: "comment",
        maxLength: question.maxLength ?? 500,
        placeholder: question.placeholder,
      };

    //
    // RATING → rating classique
    //
    case "rating":
      return {
        ...base,
        type: "rating",
        rateMin: question.rateMin ?? 1,
        rateMax: question.rateMax ?? 5,
        minRateDescription: question.minRateDescription,
        maxRateDescription: question.maxRateDescription,
      };

    //
    // MATRIX → matrix
    //
    case "matrix":
      return {
        ...base,
        type: "matrix",
        rows: question.rows ?? [],
        columns: question.columns ?? [],
      };

    //
    // IMAGE RANKING → ranking
    //
    case "image_ranking":
      return {
        ...base,
        type: "ranking",
        choices:
          question.choices ??
          (question.imageChoices ?? []).map((c) => c.value),
        imageChoices: question.imageChoices,
      };

    //
    // MEDIA → file (photo / video / audio)
    //
    case "media": {
      const mediaTypes = question.mediaTypes ?? ["photo"];
      const accept: string[] = [];

      if (mediaTypes.includes("photo")) accept.push("image/*");
      if (mediaTypes.includes("video")) accept.push("video/*");
      if (mediaTypes.includes("audio")) accept.push("audio/*");

      return {
        ...base,
        type: "file",
        maxFiles: question.maxFiles ?? 1,
        maxSize: (question.maxSizeMb ?? 10) * 1024 * 1024,
        allowMultiple: (question.maxFiles ?? 1) > 1,
        showPreview: true,
        // Custom meta, utilisable par ton frontend
        mediaTypes,
        captureRequired: question.captureRequired ?? false,
        acceptedTypes: accept.join(","),
      };
    }

    //
    // GPS → text + métadonnées (pour futur widget custom)
    //
    case "gps": {
      const helper =
        "La géolocalisation pourra être utilisée pour analyser la localisation de la réponse.";
      return {
        ...base,
        type: "text",
        inputType: "text",
        placeholder: helper,
        // On garde toute la config GPS en props custom
        gpsMode: question.gpsMode,
        targetLocation: question.targetLocation,
        maxDistanceMeters: question.maxDistanceMeters,
        minTimeOnSiteSeconds: question.minTimeOnSiteSeconds,
        requiresPathTracking: question.requiresPathTracking,
        gpsToleranceMeters: question.gpsToleranceMeters,
      };
    }

    //
    // SECTION → html (titre + description)
    //
    case "section":
      return {
        name: question.name,
        type: "html",
        html: `
          <div class="survey-section">
            <h3>${question.title ?? ""}</h3>
            ${
              question.description
                ? `<p>${question.description}</p>`
                : ""
            }
          </div>
        `,
      };

    //
    // BOOLEAN → boolean SurveyJS
    //
    default: {
      if (question.type === "boolean") {
        return {
          ...base,
          type: "boolean",
          labelTrue: "Oui",
          labelFalse: "Non",
        };
      }

      // Fallback: text
      return {
        ...base,
        type: "text",
      };
    }
  }
}

export function mapSurveyToSurveyJS(survey: Survey): any {
  return {
    title: survey.title,
    description: survey.description,
    showProgressBar: survey.showProgressBar ?? "top",
    showQuestionNumbers: survey.showQuestionNumbers ?? "on",
    showPageTitles: survey.showPageTitles ?? true,
    pages: survey.pages.map((page) => ({
      name: page.name,
      title: page.title,
      description: page.description,
      visibleIf: page.visibleIf,
      navigationButtonsVisibility: page.navigationButtonsVisibility,
      elements: page.elements.map(mapQuestionToSurveyJS),
    })),
  };
}
