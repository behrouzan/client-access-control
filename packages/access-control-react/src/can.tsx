"use client";

import type { ReactNode } from "react";
import type { PermissionKey } from "@behrouzan/access-control";

import { useAccessControl } from "./access-control-context.js";

type SinglePermissionProps<TPermission extends PermissionKey> = {
  permission: TPermission;
  permissions?: never;
  match?: never;
};

type MultiplePermissionsProps<TPermission extends PermissionKey> = {
  permission?: never;
  permissions: readonly TPermission[];
  match: "any" | "all";
};

export type CanProps<TPermission extends PermissionKey> = (
  | SinglePermissionProps<TPermission>
  | MultiplePermissionsProps<TPermission>
) & {
  children: ReactNode;
  fallback?: ReactNode;
};

export function Can<TPermission extends PermissionKey>(
  props: CanProps<TPermission>,
) {
  const access = useAccessControl<TPermission>();

  const { children, fallback = null } = props;

  let allowed: boolean;

  if (props.permissions !== undefined) {
    allowed =
      props.match === "any"
        ? access.canAny(props.permissions)
        : access.canAll(props.permissions);
  } else {
    allowed = access.can(props.permission);
  }

  return allowed ? children : fallback;
}