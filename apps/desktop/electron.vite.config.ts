import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: resolve("build/main"),
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: resolve("build/preload"),
    },
  },
  renderer: {
    build: {
      outDir: resolve("build/renderer"),
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [
      react({
        babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
      }),
      svgr(),
    ],
  },
});
