"use client";

import type { PermissionKey } from "@behrouzan/access-control";
import { useAccessControl } from "./access-control-context.js";

export function useCan<TPermission extends PermissionKey>(
  permission: TPermission,
): boolean {
  const access = useAccessControl<TPermission>();

  return access.can(permission);
}