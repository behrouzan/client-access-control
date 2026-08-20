"use client";

import type { ReactNode } from "react";
import type { PermissionKey } from "@behrouzan/access-control";

import { useAccessControl } from "./access-control-context";

type SinglePermissionProps<TPermission extends PermissionKey> = {
  mode: "single";
  permission: TPermission;
};

type AnyPermissionProps<TPermission extends PermissionKey> = {
  mode: "any";
  permissions: readonly TPermission[];
};

type AllPermissionProps<TPermission extends PermissionKey> = {
  mode: "all";
  permissions: readonly TPermission[];
};

type PermissionConditionProps<TPermission extends PermissionKey> =
  | SinglePermissionProps<TPermission>
  | AnyPermissionProps<TPermission>
  | AllPermissionProps<TPermission>;

export type CanProps<TPermission extends PermissionKey> =
  PermissionConditionProps<TPermission> & {
    children: ReactNode;
    fallback?: ReactNode;
  };

export function Can<TPermission extends PermissionKey>(
  props: CanProps<TPermission>,
) {
  const access = useAccessControl<TPermission>();

  const { children, fallback = null } = props;

  let allowed: boolean;

  switch (props.mode) {
    case "single":
      allowed = access.can(props.permission);
      break;

    case "any":
      allowed = access.canAny(props.permissions);
      break;

    case "all":
      allowed = access.canAll(props.permissions);
      break;
  }

  return allowed ? children : fallback;
}