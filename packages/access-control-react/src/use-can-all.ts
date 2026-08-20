"use client";

import type { PermissionKey } from "@behrouzan/access-control";
import { useAccessControl } from "./access-control-context";

export function useCanAll<TPermission extends PermissionKey>(
  permissions: readonly TPermission[],
): boolean {
  const access = useAccessControl<TPermission>();

  return access.canAll(permissions);
}