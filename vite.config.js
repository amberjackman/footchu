// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      external: ["react-router-dom"],
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
