import { describe, expect, it } from "vitest";
import { createAccessControl } from "./index";

describe("createAccessControl", () => {
  it("returns true when the permission exists", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.can("products.edit")).toBe(true);
  });

  it("returns false when the permission does not exist", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.can("orders.view")).toBe(false);
  });

  it("supports numeric permissions", () => {
    const access = createAccessControl({
      permissions: [1, 3, 5],
    });

    expect(access.can(3)).toBe(true);
    expect(access.can(2)).toBe(false);
  });

  it("returns false when permissions are empty", () => {
    const access = createAccessControl({
      permissions: [],
    });

    expect(access.can("products.view")).toBe(false);
  });

  it("returns true when any permission exists", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.canAny(["orders.view", "products.edit"])).toBe(true);
  });

  it("returns false when none of the permissions exist", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.canAny(["orders.view", "orders.edit"])).toBe(false);
  });

  it("returns true when all permissions exist", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit", "orders.view"],
    });

    expect(access.canAll(["products.view", "products.edit"])).toBe(true);
  });

  it("returns false when at least one permission does not exist", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.canAll(["products.view", "orders.view"])).toBe(false);
  });

  it("updates permissions", () => {
    const access = createAccessControl({
      permissions: ["products.view"],
    });

    expect(access.can("products.view")).toBe(true);
    expect(access.can("orders.view")).toBe(false);

    access.setPermissions(["orders.view"]);

    expect(access.can("products.view")).toBe(false);
    expect(access.can("orders.view")).toBe(true);
  });

  it("does not mutate the original permissions array", () => {
    const permissions = ["products.view", "products.edit"] as const;

    const access = createAccessControl({
      permissions,
    });

    expect(access.can("products.view")).toBe(true);
    expect(permissions).toEqual(["products.view", "products.edit"]);
  });

  it("handles duplicate permissions", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.view", "products.edit"],
    });

    expect(access.can("products.view")).toBe(true);
    expect(access.can("products.edit")).toBe(true);
  });

  it("returns false for canAny with an empty list", () => {
    const access = createAccessControl({
      permissions: ["products.view"],
    });

    expect(access.canAny([])).toBe(false);
  });

  it("returns true for canAll with an empty list", () => {
    const access = createAccessControl({
      permissions: ["products.view"],
    });

    expect(access.canAll([])).toBe(true);
  });

  it("preserves numeric permission types", () => {
    const access = createAccessControl({
      permissions: [1, 3, 5],
    });

    expect(access.can(3)).toBe(true);

    // @ts-expect-error string permissions should not be accepted
    access.can("products.view");
  });

  it("preserves string permission types", () => {
    const access = createAccessControl({
      permissions: ["products.view", "products.edit"],
    });

    expect(access.can("products.edit")).toBe(true);

    // @ts-expect-error numeric permissions should not be accepted
    access.can(3);
  });

  it("supports custom permission unions", () => {
    type Permission = "products.view" | "products.edit" | "orders.view";

    const access = createAccessControl<Permission>({
      permissions: ["products.view", "orders.view"],
    });

    expect(access.can("products.view")).toBe(true);

    // @ts-expect-error permission is not part of the Permission union
    access.can("users.delete");
  });
});
