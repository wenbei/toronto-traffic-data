import App from "./App.svelte";

const app = new App({
  target: document.body,
});

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default app;
