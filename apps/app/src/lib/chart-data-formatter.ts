// Utilitaires pour reformater les données et config des graphiques en temps réel

interface SurveyResponseRaw {
  id: string;
  responses: any; // JSON string ou object
  age: number;
  gender: string;
  location: any; // JSON
  status: string;
}

// Fonction pour extraire toutes les réponses d'une question spécifique
export function extractResponsesForQuestion(
  surveyResponses: SurveyResponseRaw[],
  questionTitle: string
): Array<{ answer: any; age: number; gender: string; location: any; responseId: string }> {
  const questionResponses: Array<{
    answer: any;
    age: number;
    gender: string;
    location: any;
    responseId: string;
  }> = [];

  surveyResponses.forEach((response) => {
    try {
      // Parser le JSON des réponses
      const responsesData = typeof response.responses === 'string' 
        ? JSON.parse(response.responses) 
        : response.responses;

      // Chercher la question spécifique
      if (responsesData[questionTitle]) {
        const questionData = responsesData[questionTitle];
        
        questionResponses.push({
          answer: questionData.answer,
          age: response.age,
          gender: response.gender,
          location: typeof response.location === 'string' 
            ? JSON.parse(response.location) 
            : response.location,
          responseId: response.id,
        });
      }
    } catch (error) {
      // Skip les réponses qui ne peuvent pas être parsées
      console.warn(`Erreur parsing response ${response.id}:`, error);
    }
  });

  return questionResponses;
}

// Reformate les données d'une question pour l'affichage en graphique
export function formatChartDataFromResponses(
  questionResponses: Array<{ answer: any; age: number; gender: string; location: any; responseId: string }>,
  questionType: string
): Array<{ label: string; value: number }> | string[] | any[] {
  if (!questionResponses || questionResponses.length === 0) {
    return [];
  }

  switch (questionType) {
    case "dropdown":
      const dropdownCounts: Record<string, number> = {};
      questionResponses.forEach((response) => {
        const answer = String(response.answer);
        dropdownCounts[answer] = (dropdownCounts[answer] || 0) + 1;
      });

      return Object.entries(dropdownCounts).map(([label, value]) => ({
        label,
        value,
      }));

    case "checkbox":
      const checkboxCounts: Record<string, number> = {};
      questionResponses.forEach((response) => {
        const answers = Array.isArray(response.answer)
          ? response.answer
          : [response.answer];

        answers.forEach((answer: string) => {
          if (answer) { // Éviter les réponses vides
            checkboxCounts[answer] = (checkboxCounts[answer] || 0) + 1;
          }
        });
      });

      return Object.entries(checkboxCounts).map(([label, value]) => ({
        label,
        value,
      }));

    case "boolean":
      const booleanCounts: Record<string, number> = {};
      questionResponses.forEach((response) => {
        const answer = response.answer ? "Oui" : "Non";
        booleanCounts[answer] = (booleanCounts[answer] || 0) + 1;
      });

      return Object.entries(booleanCounts).map(([label, value]) => ({
        label,
        value,
        fill: `var(--color-${label.toLowerCase()})`,
      }));

    case "rating":
      const ratings = questionResponses.map((response) =>
        parseInt(String(response.answer), 10)
      ).filter(rating => !isNaN(rating));
      
      if (ratings.length === 0) return [];
      
      const minRating = Math.min(...ratings);
      const maxRating = Math.max(...ratings);

      const ratingData = [
        {
          category: "Évaluation",
          ...Object.fromEntries(
            Array.from({ length: maxRating - minRating + 1 }, (_, i) => {
              const rating = minRating + i;
              return [rating.toString(), 0];
            })
          ),
        },
      ];

      questionResponses.forEach((response) => {
        const rating = String(response.answer);
        if (!isNaN(parseInt(rating, 10)) && ratingData[0][rating] !== undefined) {
          (ratingData[0] as any)[rating]++;
        }
      });

      return ratingData;

    case "text":
    case "comment":
      return questionResponses
        .map((response) => String(response.answer))
        .filter(answer => answer && answer.trim().length > 0); // Éviter les réponses vides

    default:
      return [];
  }
}

// Génère la config des couleurs pour un graphique
export function generateChartConfigFromData(
  data: Array<{ label: string; value: number }> | string[] | any[],
  questionType: string
): Record<string, { label: string; color: string }> {
  const config: Record<string, { label: string; color: string }> = {};

  // Couleurs prédéfinies
  const colorVariables = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
    "hsl(var(--chart-9))",
    "hsl(var(--chart-10))",
  ];

  switch (questionType) {
    case "dropdown":
    case "checkbox":
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'label' in data[0]) {
        (data as Array<{ label: string; value: number }>).forEach((item, index) => {
          config[item.label] = {
            label: item.label,
            color: colorVariables[index % colorVariables.length] || "hsl(var(--chart-1))",
          };
        });
      }
      break;

    case "boolean":
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'label' in data[0]) {
        (data as Array<{ label: string; value: number }>).forEach((item) => {
          const colorKey = item.label.toLowerCase();
          config[item.label] = {
            label: item.label,
            color: item.label === "Oui" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
          };
          // Ajouter aussi la version lowercase pour les CSS variables
          config[colorKey] = {
            label: item.label,
            color: item.label === "Oui" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
          };
        });
      }
      break;

    case "rating":
      // Pour les ratings, on génère une config basée sur la plage de notes
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        const ratingData = data[0] as any;
        const keys = Object.keys(ratingData).filter(key => key !== 'category' && !isNaN(Number(key)));
        
        keys.forEach((key, index) => {
          const rating = parseInt(key, 10);
          config[key] = {
            label: `${rating} étoile${rating > 1 ? "s" : ""}`,
            color: `hsl(var(--chart-${(index % 10) + 1}))`,
          };
        });
      }
      break;

    case "text":
    case "comment":
      // Pour les réponses textuelles, pas de config de couleurs nécessaire
      break;

    default:
      break;
  }

  // Ajouter toujours une config par défaut pour "value"
  config.value = {
    label: "value",
    color: "hsl(var(--chart-1))",
  };

  return config;
}

// Fonction utilitaire pour extraire les clés primaires (pour les ratings)
export function extractPrimaryKeysFromRatingData(data: any[]): string[] {
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
    return [];
  }

  const ratingData = data[0] as any;
  return Object.keys(ratingData)
    .filter(key => key !== 'category' && !isNaN(Number(key)))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

// Fonction utilitaire pour extraire min/max des ratings
export function extractRatingRange(data: any[]): { min: number; max: number } {
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
    return { min: 0, max: 10 };
  }

  const ratingData = data[0] as any;
  const ratings = Object.keys(ratingData)
    .filter(key => key !== 'category' && !isNaN(Number(key)))
    .map(key => parseInt(key, 10));

  return {
    min: Math.min(...ratings),
    max: Math.max(...ratings),
  };
}