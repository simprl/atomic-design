import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { resolve } from "path";

export default defineConfig({
  plugins: [vike(), react({})],
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
    },
  },
  css: {
    modules: {
      exportGlobals: true,
    },
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});
