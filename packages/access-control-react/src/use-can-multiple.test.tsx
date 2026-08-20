import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";

import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import { AccessControlProvider } from "./access-control-context";
import { useCanAny } from "./use-can-any";
import { useCanAll } from "./use-can-all";

afterEach(() => {
  cleanup();
});

function AnyTestComponent() {
  const allowed = useCanAny([
    "products.edit",
    "products.delete",
  ]);

  return <div>{allowed ? "allowed" : "denied"}</div>;
}

function AllTestComponent() {
  const allowed = useCanAll([
    "products.view",
    "products.edit",
  ]);

  return <div>{allowed ? "allowed" : "denied"}</div>;
}

describe("multiple permission hooks", () => {
  it("useCanAny returns true when at least one permission exists", () => {
    render(
      <AccessControlProvider
        permissions={[
          "products.view",
          "products.edit",
        ]}
      >
        <AnyTestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("allowed")).toBeTruthy();
  });

  it("useCanAny returns false when no permission exists", () => {
    render(
      <AccessControlProvider
        permissions={["products.view"]}
      >
        <AnyTestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("denied")).toBeTruthy();
  });

  it("useCanAll returns true when all permissions exist", () => {
    render(
      <AccessControlProvider
        permissions={[
          "products.view",
          "products.edit",
        ]}
      >
        <AllTestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("allowed")).toBeTruthy();
  });

  it("useCanAll returns false when one permission is missing", () => {
    render(
      <AccessControlProvider
        permissions={["products.view"]}
      >
        <AllTestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("denied")).toBeTruthy();
  });
});