/**
 * Questions standards pour l'enrichissement de profil des contributeurs
 * Ces questions permettent de collecter des informations supplémentaires
 * qui seront utilisées comme filtres d'audience
 */

export interface ProfileEnhancementQuestion {
  id: string;
  title: string;
  titleEn?: string;
  type: "multiple_choice" | "single_choice" | "text" | "number";
  options?: string[];
  required: boolean;
  category: string;
  description?: string;
}

/**
 * Catégories de questions pour l'enrichissement de profil
 */
export const PROFILE_CATEGORIES = {
  PROFESSIONAL: "professional",
  INTERESTS: "interests",
  EQUIPMENT: "equipment",
  LANGUAGES: "languages",
  AVAILABILITY: "availability",
  EXPERIENCE: "experience",
} as const;

export const PROFILE_CATEGORY_LABELS = {
  professional: "Compétences professionnelles",
  interests: "Centres d'intérêt",
  equipment: "Équipement disponible",
  languages: "Langues parlées",
  availability: "Disponibilités",
  experience: "Expérience",
};

/**
 * Questions standards pré-configurées
 */
export const PROFILE_ENHANCEMENT_QUESTIONS: ProfileEnhancementQuestion[] = [
  // Compétences professionnelles
  {
    id: "professional_skills",
    title: "Quelles sont vos compétences professionnelles ?",
    titleEn: "What are your professional skills?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.PROFESSIONAL,
    description:
      "Sélectionnez tous les domaines dans lesquels vous avez de l'expérience",
    options: [
      "Marketing & Communication",
      "Informatique & Technologies",
      "Finance & Comptabilité",
      "Santé & Médical",
      "Éducation & Formation",
      "Vente & Commerce",
      "Ressources Humaines",
      "Logistique & Transport",
      "Droit & Juridique",
      "Arts & Création",
      "Agriculture & Agroalimentaire",
      "Industrie & Manufacturing",
      "Tourisme & Hôtellerie",
      "Immobilier & Construction",
      "Conseil & Audit",
    ],
    required: false,
  },
  {
    id: "job_sector",
    title: "Dans quel secteur travaillez-vous actuellement ?",
    titleEn: "What sector do you currently work in?",
    type: "single_choice",
    category: PROFILE_CATEGORIES.PROFESSIONAL,
    options: [
      "Secteur public",
      "Secteur privé - PME",
      "Secteur privé - Grande entreprise",
      "Entrepreneuriat / Indépendant",
      "Association / ONG",
      "Étudiant",
      "Sans emploi",
      "Retraité",
    ],
    required: false,
  },

  // Centres d'intérêt
  {
    id: "interests",
    title: "Quels sont vos centres d'intérêt ?",
    titleEn: "What are your interests?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.INTERESTS,
    description:
      "Sélectionnez les domaines qui vous passionnent",
    options: [
      "Sport & Fitness",
      "Technologie & Gadgets",
      "Cuisine & Gastronomie",
      "Voyage & Découverte",
      "Mode & Beauté",
      "Culture & Arts",
      "Écologie & Environnement",
      "Finance & Investissement",
      "Gaming & E-sport",
      "Musique & Concerts",
      "Cinéma & Séries",
      "Lecture & Littérature",
      "Automobile & Mécanique",
      "Décoration & Design",
      "Famille & Parentalité",
    ],
    required: false,
  },

  // Équipements
  {
    id: "equipment",
    title: "De quel équipement disposez-vous ?",
    titleEn: "What equipment do you have?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.EQUIPMENT,
    description:
      "Indiquez l'équipement que vous possédez et qui pourrait être utilisé pour des missions",
    options: [
      "Microphone professionnel",
      "Webcam HD (1080p ou plus)",
      "Smartphone récent (moins de 2 ans)",
      "Ordinateur performant",
      "Tablette",
      "Connexion internet stable (>10 Mbps)",
      "Espace calme pour enregistrement",
      "Éclairage adapté",
      "Logiciels de montage vidéo/audio",
    ],
    required: false,
  },

  // Langues
  {
    id: "languages",
    title: "Quelles langues parlez-vous ?",
    titleEn: "What languages do you speak?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.LANGUAGES,
    description:
      "Sélectionnez toutes les langues que vous maîtrisez avec leur niveau",
    options: [
      "Français (natif)",
      "Français (courant)",
      "Français (intermédiaire)",
      "Anglais (natif)",
      "Anglais (courant)",
      "Anglais (intermédiaire)",
      "Espagnol (courant)",
      "Espagnol (intermédiaire)",
      "Allemand (courant)",
      "Allemand (intermédiaire)",
      "Italien (courant)",
      "Italien (intermédiaire)",
      "Arabe (natif)",
      "Arabe (courant)",
      "Portugais (courant)",
      "Portugais (intermédiaire)",
      "Mandarin",
      "Japonais",
      "Russe",
    ],
    required: true,
  },

  // Disponibilités
  {
    id: "availability",
    title: "Quelles sont vos disponibilités habituelles ?",
    titleEn: "What is your usual availability?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.AVAILABILITY,
    description:
      "Indiquez les créneaux horaires où vous êtes généralement disponible",
    options: [
      "Lundi-Vendredi Matin (8h-12h)",
      "Lundi-Vendredi Après-midi (12h-18h)",
      "Lundi-Vendredi Soir (18h-22h)",
      "Weekend Matin",
      "Weekend Après-midi",
      "Weekend Soir",
      "Flexible / Variable",
      "Uniquement sur rendez-vous",
    ],
    required: false,
  },

  // Expérience en recherche
  {
    id: "research_experience",
    title: "Quelle est votre expérience en recherche de marché ?",
    titleEn: "What is your market research experience?",
    type: "single_choice",
    category: PROFILE_CATEGORIES.EXPERIENCE,
    options: [
      "Débutant (première fois)",
      "Novice (2-5 missions)",
      "Intermédiaire (6-15 missions)",
      "Expérimenté (16-30 missions)",
      "Expert (31+ missions)",
    ],
    required: true,
  },

  // Fréquence de participation souhaitée
  {
    id: "participation_frequency",
    title: "À quelle fréquence souhaitez-vous participer à des missions ?",
    titleEn: "How often would you like to participate in missions?",
    type: "single_choice",
    category: PROFILE_CATEGORIES.AVAILABILITY,
    options: [
      "Plusieurs fois par semaine",
      "Une fois par semaine",
      "2-3 fois par mois",
      "Une fois par mois",
      "Occasionnellement",
    ],
    required: false,
  },

  // Durée préférée des missions
  {
    id: "preferred_mission_duration",
    title: "Quelle durée de mission préférez-vous ?",
    titleEn: "What mission duration do you prefer?",
    type: "multiple_choice",
    category: PROFILE_CATEGORIES.AVAILABILITY,
    options: [
      "Courte (moins de 15 minutes)",
      "Moyenne (15-30 minutes)",
      "Longue (30-60 minutes)",
      "Très longue (plus d'1 heure)",
      "Pas de préférence",
    ],
    required: false,
  },
];

/**
 * Helper pour récupérer les questions par catégorie
 */
export function getQuestionsByCategory(
  category: (typeof PROFILE_CATEGORIES)[keyof typeof PROFILE_CATEGORIES]
): ProfileEnhancementQuestion[] {
  return PROFILE_ENHANCEMENT_QUESTIONS.filter((q) => q.category === category);
}

/**
 * Helper pour récupérer une question par ID
 */
export function getQuestionById(
  id: string
): ProfileEnhancementQuestion | undefined {
  return PROFILE_ENHANCEMENT_QUESTIONS.find((q) => q.id === id);
}
