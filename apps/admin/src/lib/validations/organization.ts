/**
 * Validations et types pour la gestion des organisations
 */

export interface CreateOrganizationInput {
  organization: {
    name: string;
    slug: string;
    logo?: string | null;
    metadata?: string | null;
    status?: string | null;
    country?: string | null;
    sector?: string | null;
  };
  owner: {
    email: string;
    name: string;
    position?: string | null;
  };
}

export interface UpdateOrganizationInput {
  name?: string;
  slug?: string;
  logo?: string | null;
  metadata?: string | null;
  status?: string | null;
  country?: string | null;
  sector?: string | null;
}

/**
 * Génère un slug à partir d'un nom
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/[\s_-]+/g, '-') // Remplacer espaces et underscores par des tirets
    .replace(/^-+|-+$/g, ''); // Supprimer les tirets au début et à la fin
}

/**
 * Valide le format d'un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Valide les données de création d'une organisation
 */
export function validateCreateOrganization(data: any): {
  valid: boolean;
  errors: string[];
  data?: CreateOrganizationInput;
} {
  const errors: string[] = [];
  
  // Validation du nom de l'organisation
  if (!data.name) {
    errors.push("Organization name is required");
  } else if (data.name.trim().length < 2) {
    errors.push("Organization name must be at least 2 characters long");
  }
  
  // Validation ou génération du slug
  let slug = data.slug;
  if (!slug && data.name) {
    slug = generateSlug(data.name);
  }
  
  if (slug && !isValidSlug(slug)) {
    errors.push("Invalid slug format. Use only lowercase letters, numbers, and hyphens");
  }
  
  // Validation de l'email du propriétaire
  if (!data.ownerEmail) {
    errors.push("Owner email is required");
  } else if (!isValidEmail(data.ownerEmail)) {
    errors.push("Invalid owner email format");
  }
  
  // Validation du nom du propriétaire
  if (!data.ownerName) {
    errors.push("Owner name is required");
  } else if (data.ownerName.trim().length < 2) {
    errors.push("Owner name must be at least 2 characters long");
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    data: {
      organization: {
        name: data.name.trim(),
        slug: slug,
        logo: data.logo || null,
        metadata: data.metadata || null,
        status: data.status || "active",
        country: data.country || null,
        sector: data.sector || null,
      },
      owner: {
        email: data.ownerEmail.toLowerCase().trim(),
        name: data.ownerName.trim(),
        position: data.ownerPosition || null,
      },
    },
  };
}

/**
 * Valide les données de mise à jour d'une organisation
 */
export function validateUpdateOrganization(data: any): {
  valid: boolean;
  errors: string[];
  data?: UpdateOrganizationInput;
} {
  const errors: string[] = [];
  const updateData: UpdateOrganizationInput = {};
  
  // Validation du nom si fourni
  if (data.name !== undefined) {
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Organization name must be at least 2 characters long");
    } else {
      updateData.name = data.name.trim();
    }
  }
  
  // Validation du slug si fourni
  if (data.slug !== undefined) {
    if (!isValidSlug(data.slug)) {
      errors.push("Invalid slug format. Use only lowercase letters, numbers, and hyphens");
    } else {
      updateData.slug = data.slug;
    }
  }
  
  // Autres champs optionnels
  if (data.logo !== undefined) updateData.logo = data.logo;
  if (data.metadata !== undefined) updateData.metadata = data.metadata;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.country !== undefined) updateData.country = data.country;
  if (data.sector !== undefined) updateData.sector = data.sector;
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    data: updateData,
  };
}

/**
 * Liste des secteurs d'activité disponibles
 */
export const SECTORS = [
  "Technologie",
  "Finance",
  "Santé",
  "Éducation",
  "Commerce",
  "Industrie",
  "Services",
  "Agriculture",
  "Transport",
  "Énergie",
  "Immobilier",
  "Médias",
  "Tourisme",
  "Autre",
] as const;

/**
 * Liste des statuts d'organisation disponibles
 */
export const ORGANIZATION_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;
