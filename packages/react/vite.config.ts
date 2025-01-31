import { defineConfig } from "vite";
import { resolve } from "node:path";

import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

import * as pkg from "./package.json";

export default defineConfig({
  base: "",
  plugins: [
    dts({
      exclude: ["node_modules", "vite.config.ts"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/index.scss",
          dest: "",
        },
      ],
    }),
    react(),
  ],
  build: {
    // Temporarily not emptying the out-dir until https://github.com/qmhc/vite-plugin-dts/issues/335 is fixed.
    // vite-plugin-dts currently does not generate d.ts files when a CSS file is changed in watch mode.
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      formats: ["es"],
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        ...(Object.keys(pkg.peerDependencies) || {}),
        "react/jsx-runtime",
      ],
      preserveEntrySignatures: "strict",
    },
  },
});
