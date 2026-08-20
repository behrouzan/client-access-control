import type { PermissionKey } from "./permission-key";

export interface AccessControl<TPermission extends PermissionKey> {
  can(permission: TPermission): boolean;
  canAny(permissions: readonly TPermission[]): boolean;
  canAll(permissions: readonly TPermission[]): boolean;
  setPermissions(permissions: readonly TPermission[]): void;
}

export interface AccessControlOptions<TPermission extends PermissionKey> {
  permissions: readonly TPermission[];
}

export function createAccessControl(
  options: AccessControlOptions<string>,
): AccessControl<string>;

export function createAccessControl(
  options: AccessControlOptions<number>,
): AccessControl<number>;

export function createAccessControl<TPermission extends PermissionKey>(
  options: AccessControlOptions<TPermission>,
): AccessControl<TPermission>;

export function createAccessControl<TPermission extends PermissionKey>(
  options: AccessControlOptions<TPermission>,
): AccessControl<TPermission> {
  const permissions = new Set(options.permissions);

  return {
    can(permission: TPermission): boolean {
      return permissions.has(permission);
    },
    canAny(requiredPermissions: readonly TPermission[]): boolean {
      return requiredPermissions.some((permission) =>
        permissions.has(permission),
      );
    },
    canAll(requiredPermissions: readonly TPermission[]): boolean {
      return requiredPermissions.every((permission) =>
        permissions.has(permission),
      );
    },
    setPermissions(newPermissions: readonly TPermission[]): void {
      permissions.clear();

      for (const permission of newPermissions) {
        permissions.add(permission);
      }
    },
  };
}
