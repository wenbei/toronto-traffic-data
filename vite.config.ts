import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tsconfigPaths()],
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
        // assetFileNames: `assets/[name].[ext]`
        assetFileNames: (assetInfo) => {
          const fileType = assetInfo.name.split(".").at(1);
          if (fileType == "css") {
            return `[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
  },
});
