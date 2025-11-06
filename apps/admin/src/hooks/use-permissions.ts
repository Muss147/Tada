"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {
  type Permission,
  type UserRole,
  type AdminSubRole,
  hasEffectivePermission,
  getEffectiveAdminPermissions,
  USER_ROLES,
  ADMIN_SUB_ROLES,
} from "@/lib/rbac/roles";

interface UserWithSubRole {
  role?: UserRole;
  adminSubRole?: AdminSubRole | null;
  banned?: boolean;
}

/**
 * Hook to check user permissions on the client side
 */
export function usePermissions() {
  const { data: session } = useSession();
  const user = session?.user as UserWithSubRole | undefined;

  const permissions = useMemo(() => {
    if (!user || user.banned) {
      return [];
    }

    return getEffectiveAdminPermissions(
      user.role as UserRole,
      user.adminSubRole as AdminSubRole | null
    );
  }, [user]);

  const hasPermission = (permission: Permission): boolean => {
    if (!user || user.banned) {
      return false;
    }

    return hasEffectivePermission(
      user.role as UserRole,
      permission,
      user.adminSubRole as AdminSubRole | null
    );
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    if (!user || user.banned) {
      return false;
    }

    return requiredPermissions.every((permission) =>
      hasEffectivePermission(
        user.role as UserRole,
        permission,
        user.adminSubRole as AdminSubRole | null
      )
    );
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    if (!user || user.banned) {
      return false;
    }

    return requiredPermissions.some((permission) =>
      hasEffectivePermission(
        user.role as UserRole,
        permission,
        user.adminSubRole as AdminSubRole | null
      )
    );
  };

  const isSuperAdmin = (): boolean => {
    if (!user || user.banned) {
      return false;
    }

    return (
      user.role === USER_ROLES.SYSTEM_ADMIN &&
      (!user.adminSubRole || user.adminSubRole === ADMIN_SUB_ROLES.SUPER_ADMIN)
    );
  };

  const isSystemAdmin = (): boolean => {
    if (!user || user.banned) {
      return false;
    }

    return user.role === USER_ROLES.SYSTEM_ADMIN;
  };

  return {
    permissions,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isSuperAdmin,
    isSystemAdmin,
    user,
  };
}

/**
 * Component to conditionally render based on permissions
 */
interface PermissionGateProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // If true, requires ALL permissions. If false, requires ANY
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGate({
  permission,
  permissions = [],
  requireAll = true,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions.length > 0) {
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
