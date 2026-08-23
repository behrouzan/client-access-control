import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, it } from "vitest";

import { AccessControlProvider } from "./access-control-context";
import { Can } from "./can";

afterEach(() => {
  cleanup();
});

describe("Can", () => {
  it("renders children when permission exists", () => {
    render(
      <AccessControlProvider permissions={["products.edit"]}>
        <Can permission="products.edit">
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.getByText("Edit")).toBeTruthy();
  });

  it("does not render children when permission does not exist", () => {
    render(
      <AccessControlProvider permissions={["products.view"]}>
        <Can permission="products.edit">
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.queryByText("Edit")).toBeNull();
  });

  it("renders fallback when permission does not exist", () => {
    render(
      <AccessControlProvider permissions={["products.view"]}>
        <Can permission="products.edit" fallback={<span>Not allowed</span>}>
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.queryByText("Edit")).toBeNull();
    expect(screen.getByText("Not allowed")).toBeTruthy();
  });

  it("renders children when any permission exists", () => {
    render(
      <AccessControlProvider permissions={["products.edit"]}>
        <Can match="any" permissions={["products.edit", "products.delete"]}>
          <button>Actions</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.getByText("Actions")).toBeTruthy();
  });

  it("does not render children when no any permission exists", () => {
    render(
      <AccessControlProvider permissions={["products.view"]}>
        <Can match="any" permissions={["products.edit", "products.delete"]}>
          <button>Actions</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.queryByText("Actions")).toBeNull();
  });

  it("renders children when all permissions exist", () => {
    render(
      <AccessControlProvider permissions={["products.view", "products.edit"]}>
        <Can match="all" permissions={["products.view", "products.edit"]}>
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.getByText("Edit")).toBeTruthy();
  });

  it("does not render children when one required permission is missing", () => {
    render(
      <AccessControlProvider permissions={["products.view"]}>
        <Can match="all" permissions={["products.view", "products.edit"]}>
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.queryByText("Edit")).toBeNull();
  });
});
