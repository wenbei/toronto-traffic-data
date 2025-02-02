import { mount } from "svelte";

import App from "src/App.svelte";

const app = mount(App, {
  target: document.body,
});

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default app;
