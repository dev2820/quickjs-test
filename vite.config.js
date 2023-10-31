import { defineConfig } from "vite";

export default defineConfig({
  base: "/quickjs-test/",
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  worker: {
    format: "es",
  },
});
