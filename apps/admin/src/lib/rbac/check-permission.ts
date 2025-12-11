/**
 * Permission checking utilities for API routes and server actions
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  type Permission,
  type UserRole,
  type AdminSubRole,
  hasEffectivePermission,
  USER_ROLES,
} from "./roles";

/**
 * Get current user with admin sub-role from session
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      adminSubRole: true,
      image: true,
      banned: true,
    },
  });

  return user;
}

/**
 * Check if current user has a specific permission
 */
export async function checkPermission(permission: Permission): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  if (user.banned) {
    return false;
  }

  return hasEffectivePermission(
    user.role as UserRole,
    permission,
    user.adminSubRole as AdminSubRole | null
  );
}

/**
 * Require a specific permission (throws error if not authorized)
 */
export async function requirePermission(permission: Permission): Promise<void> {
  const hasPermission = await checkPermission(permission);
  
  if (!hasPermission) {
    throw new Error(`Unauthorized: Missing permission ${permission}`);
  }
}

/**
 * Check if current user is a super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return (
    user.role === USER_ROLES.SYSTEM_ADMIN &&
    (!user.adminSubRole || user.adminSubRole === "super_admin")
  );
}

/**
 * Check multiple permissions (user must have ALL)
 */
export async function checkAllPermissions(
  permissions: Permission[]
): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user || user.banned) {
    return false;
  }

  return permissions.every((permission) =>
    hasEffectivePermission(
      user.role as UserRole,
      permission,
      user.adminSubRole as AdminSubRole | null
    )
  );
}

/**
 * Check multiple permissions (user must have AT LEAST ONE)
 */
export async function checkAnyPermission(
  permissions: Permission[]
): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user || user.banned) {
    return false;
  }

  return permissions.some((permission) =>
    hasEffectivePermission(
      user.role as UserRole,
      permission,
      user.adminSubRole as AdminSubRole | null
    )
  );
}

/**
 * Get current user's effective permissions
 */
export async function getCurrentUserPermissions(): Promise<Permission[]> {
  const user = await getCurrentUser();
  
  if (!user || user.banned) {
    return [];
  }

  const { getEffectiveAdminPermissions } = await import("./roles");
  
  return getEffectiveAdminPermissions(
    user.role as UserRole,
    user.adminSubRole as AdminSubRole | null
  );
}
