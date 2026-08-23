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
import { Can } from "./can";

afterEach(() => {
  cleanup();
});

describe("AccessControlProvider", () => {
  it("updates access control when permissions change", () => {
    const { rerender } = render(
      <AccessControlProvider
        permissions={["products.view"]}
      >
        <Can permission="products.edit">
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.queryByText("Edit")).toBeNull();

    rerender(
      <AccessControlProvider
        permissions={[
          "products.view",
          "products.edit",
        ]}
      >
        <Can permission="products.edit">
          <button>Edit</button>
        </Can>
      </AccessControlProvider>,
    );

    expect(screen.getByText("Edit")).toBeTruthy();
  });
});