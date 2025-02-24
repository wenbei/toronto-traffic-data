import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tsconfigPaths(), tailwindcss()],
  server: {
    // CORS proxy for testing
    proxy: {
      "/api": {
        target: "https://ckan0.cf.opendata.inter.prod-toronto.ca",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: false,
  base: "/toronto-traffic-data/",
  build: {
    outDir: "public",
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names[0];
          if (name.endsWith(".css")) {
            return `[name].css`;
          }
          return `assets/[name].[ext]`;
        },
        manualChunks: (id: string) => {
          if (id.includes("leaflet")) {
            return "lib/leaflet";
          }
        },
      },
    },
  },
});
