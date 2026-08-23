"use client";

import type { PermissionKey } from "@behrouzan/access-control";
import { useAccessControl } from "./access-control-context.js";

export function useCanAny<TPermission extends PermissionKey>(
  permissions: readonly TPermission[],
): boolean {
  const access = useAccessControl<TPermission>();

  return access.canAny(permissions);
}