import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AccessControlProvider } from "./access-control-context";
import { useCan } from "./use-can";

function TestComponent() {
  const canEdit = useCan("products.edit");

  return <div>{canEdit ? "allowed" : "denied"}</div>;
}

describe("useCan", () => {
  it("returns true when permission exists", () => {
    render(
      <AccessControlProvider
        permissions={["products.view", "products.edit"]}
      >
        <TestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("allowed")).toBeTruthy();
  });

  it("returns false when permission does not exist", () => {
    render(
      <AccessControlProvider
        permissions={["products.view"]}
      >
        <TestComponent />
      </AccessControlProvider>,
    );

    expect(screen.getByText("denied")).toBeTruthy();
  });
});