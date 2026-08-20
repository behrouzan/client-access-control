"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import {
  createAccessControl,
  type AccessControl,
  type PermissionKey,
} from "@behrouzan/access-control";

type AccessControlContextValue<TPermission extends PermissionKey> =
  AccessControl<TPermission>;

const AccessControlContext =
  createContext<AccessControlContextValue<PermissionKey> | null>(null);

export interface AccessControlProviderProps<TPermission extends PermissionKey> {
  permissions: readonly TPermission[];
  children: ReactNode;
}

export function AccessControlProvider<TPermission extends PermissionKey>({
  permissions,
  children,
}: AccessControlProviderProps<TPermission>) {
  const access = createAccessControl<TPermission>({
    permissions,
  });

  return (
    <AccessControlContext.Provider value={access}>
      {children}
    </AccessControlContext.Provider>
  );
}

export function useAccessControl<
  TPermission extends PermissionKey,
>(): AccessControl<TPermission> {
  const context = useContext(AccessControlContext);

  if (!context) {
    throw new Error(
      "useAccessControl must be used within an AccessControlProvider.",
    );
  }

  return context as AccessControl<TPermission>;
}
