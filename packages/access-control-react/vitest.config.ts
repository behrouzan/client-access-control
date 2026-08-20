import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
  },

  resolve: {
    alias: {
      "@behrouzan/access-control": resolve(
        import.meta.dirname,
        "../access-control/src/index.ts",
      ),
    },
  },
});