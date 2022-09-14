import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  publicDir: false,
  build: {
    outDir: "public",
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
