/**
 * Role-Based Access Control (RBAC) System
 * Defines roles, permissions, and access control logic
 */

// System-wide user roles
export const USER_ROLES = {
  SYSTEM_ADMIN: "system_admin",
  CLIENT_ADMIN: "client_admin", 
  CONTRIBUTOR: "contributor",
  VALIDATOR: "validator",
} as const;

// Organization member roles
export const MEMBER_ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
  VIEWER: "viewer",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type MemberRole = typeof MEMBER_ROLES[keyof typeof MEMBER_ROLES];

// Permission categories
export const PERMISSIONS = {
  // User Management
  USERS_CREATE: "users:create",
  USERS_READ: "users:read",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",
  USERS_IMPERSONATE: "users:impersonate",
  USERS_RESET_PASSWORD: "users:reset_password",
  
  // Organization Management
  ORGANIZATIONS_CREATE: "organizations:create",
  ORGANIZATIONS_READ: "organizations:read",
  ORGANIZATIONS_UPDATE: "organizations:update",
  ORGANIZATIONS_DELETE: "organizations:delete",
  
  // Member Management
  MEMBERS_CREATE: "members:create",
  MEMBERS_READ: "members:read",
  MEMBERS_UPDATE: "members:update",
  MEMBERS_DELETE: "members:delete",
  
  // Mission Management
  MISSIONS_CREATE: "missions:create",
  MISSIONS_READ: "missions:read",
  MISSIONS_UPDATE: "missions:update",
  MISSIONS_DELETE: "missions:delete",
  MISSIONS_ASSIGN: "missions:assign",
  MISSIONS_VALIDATE: "missions:validate",
  
  // Settings & Configuration
  SETTINGS_READ: "settings:read",
  SETTINGS_UPDATE: "settings:update",
  PACKAGES_MANAGE: "packages:manage",
  REWARDS_CONFIGURE: "rewards:configure",
  
  // Audit & Monitoring
  AUDIT_VIEW: "audit:view",
  ANALYTICS_VIEW: "analytics:view",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role definitions with permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [USER_ROLES.SYSTEM_ADMIN]: [
    // Full access to everything
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE,
    PERMISSIONS.USERS_IMPERSONATE,
    PERMISSIONS.USERS_RESET_PASSWORD,
    PERMISSIONS.ORGANIZATIONS_CREATE,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.ORGANIZATIONS_DELETE,
    PERMISSIONS.MEMBERS_CREATE,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_UPDATE,
    PERMISSIONS.MEMBERS_DELETE,
    PERMISSIONS.MISSIONS_CREATE,
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_UPDATE,
    PERMISSIONS.MISSIONS_DELETE,
    PERMISSIONS.MISSIONS_ASSIGN,
    PERMISSIONS.MISSIONS_VALIDATE,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_UPDATE,
    PERMISSIONS.PACKAGES_MANAGE,
    PERMISSIONS.REWARDS_CONFIGURE,
    PERMISSIONS.AUDIT_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  
  [USER_ROLES.CLIENT_ADMIN]: [
    // Organization and mission management
    PERMISSIONS.USERS_READ,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.MEMBERS_CREATE,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_UPDATE,
    PERMISSIONS.MEMBERS_DELETE,
    PERMISSIONS.MISSIONS_CREATE,
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_UPDATE,
    PERMISSIONS.MISSIONS_DELETE,
    PERMISSIONS.MISSIONS_ASSIGN,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  
  [USER_ROLES.CONTRIBUTOR]: [
    // Basic mission access
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.USERS_READ,
  ],
  
  [USER_ROLES.VALIDATOR]: [
    // Mission validation access
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_VALIDATE,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.AUDIT_VIEW,
  ],
};

// Member role permissions within an organization
export const MEMBER_ROLE_PERMISSIONS: Record<MemberRole, Permission[]> = {
  [MEMBER_ROLES.OWNER]: [
    // Full organization access
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.ORGANIZATIONS_DELETE,
    PERMISSIONS.MEMBERS_CREATE,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_UPDATE,
    PERMISSIONS.MEMBERS_DELETE,
    PERMISSIONS.MISSIONS_CREATE,
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_UPDATE,
    PERMISSIONS.MISSIONS_DELETE,
    PERMISSIONS.MISSIONS_ASSIGN,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  
  [MEMBER_ROLES.ADMIN]: [
    // Organization management without delete
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.MEMBERS_CREATE,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_UPDATE,
    PERMISSIONS.MISSIONS_CREATE,
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_UPDATE,
    PERMISSIONS.MISSIONS_DELETE,
    PERMISSIONS.MISSIONS_ASSIGN,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  
  [MEMBER_ROLES.MEMBER]: [
    // Basic organization access
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MISSIONS_CREATE,
    PERMISSIONS.MISSIONS_READ,
    PERMISSIONS.MISSIONS_UPDATE,
  ],
  
  [MEMBER_ROLES.VIEWER]: [
    // Read-only access
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MISSIONS_READ,
  ],
};

// Role metadata for display
export const ROLE_METADATA = {
  [USER_ROLES.SYSTEM_ADMIN]: {
    label: "Administrateur Système",
    description: "Accès complet à toutes les fonctionnalités de la plateforme",
    color: "red",
    icon: "Shield",
  },
  [USER_ROLES.CLIENT_ADMIN]: {
    label: "Administrateur Client",
    description: "Gestion de son organisation et des missions",
    color: "blue",
    icon: "UserCog",
  },
  [USER_ROLES.CONTRIBUTOR]: {
    label: "Contributeur",
    description: "Participe aux missions et tâches",
    color: "green",
    icon: "Users",
  },
  [USER_ROLES.VALIDATOR]: {
    label: "Validateur",
    description: "Valide les missions et contributions",
    color: "purple",
    icon: "CheckCircle",
  },
};

export const MEMBER_ROLE_METADATA = {
  [MEMBER_ROLES.OWNER]: {
    label: "Propriétaire",
    description: "Accès complet à l'organisation",
    color: "red",
  },
  [MEMBER_ROLES.ADMIN]: {
    label: "Administrateur",
    description: "Gestion de l'organisation",
    color: "blue",
  },
  [MEMBER_ROLES.MEMBER]: {
    label: "Membre",
    description: "Accès standard",
    color: "green",
  },
  [MEMBER_ROLES.VIEWER]: {
    label: "Lecteur",
    description: "Lecture seule",
    color: "gray",
  },
};

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes(permission);
}

/**
 * Check if a member has a specific permission in their organization
 */
export function hasMemberPermission(memberRole: MemberRole, permission: Permission): boolean {
  const permissions = MEMBER_ROLE_PERMISSIONS[memberRole];
  return permissions.includes(permission);
}

/**
 * Get all permissions for a user role
 */
export function getUserPermissions(userRole: UserRole): Permission[] {
  return ROLE_PERMISSIONS[userRole] || [];
}

/**
 * Get all permissions for a member role
 */
export function getMemberPermissions(memberRole: MemberRole): Permission[] {
  return MEMBER_ROLE_PERMISSIONS[memberRole] || [];
}

/**
 * Check if a role is valid
 */
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}

/**
 * Check if a member role is valid
 */
export function isValidMemberRole(role: string): role is MemberRole {
  return Object.values(MEMBER_ROLES).includes(role as MemberRole);
}

/**
 * Get combined permissions for a user (global + organization)
 */
export function getCombinedPermissions(
  userRole: UserRole,
  memberRole?: MemberRole
): Permission[] {
  const userPermissions = getUserPermissions(userRole);
  const memberPermissions = memberRole ? getMemberPermissions(memberRole) : [];
  
  // Combine and deduplicate
  return Array.from(new Set([...userPermissions, ...memberPermissions]));
}
