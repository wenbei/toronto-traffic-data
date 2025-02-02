import { sveltePreprocess } from "svelte-preprocess";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  compilerOptions: {
    runes: true,
  },
  // disable runes for svelte-spa-router, https://github.com/ItalyPaleAle/svelte-spa-router/issues/318
  vitePlugin: {
    dynamicCompileOptions({ filename }) {
      if (filename.includes("node_modules")) {
        return { runes: false };
      }
    },
  },
};
