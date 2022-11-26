<script lang="ts">
  import Router from "svelte-spa-router";

  import Map from "src/ui/Map.svelte";
  import ViewCount from "src/ui/ViewCount.svelte";

  const routes = {
    "/": Map,
    "/count/:id/:date": ViewCount,
  };
</script>

<main>
  <h1 class="text-2xl font-bold">Toronto Open Data - Traffic Volumes</h1>
  <!-- <Router {routes} /> -->
</main>

<footer class="mb-2">
  <span>
    Data source:
    <a href="https://open.toronto.ca/dataset/traffic-volumes-at-intersections-for-all-modes/"> Toronto Open Data</a>
  </span> <br />
  Disclaimer: This web application is provided "as is". The author does not take responsibility for the accuracy of the provided information. Please do your due dilligence and apply engineering judgement.
</footer>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
