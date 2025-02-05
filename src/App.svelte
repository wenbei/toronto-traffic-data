<script lang="ts">
  import "src/main.css";

  import Router from "svelte-spa-router";

  import { getUpdateDate } from "src/api/toronto-open-data";
  import Map from "src/ui/Map.svelte";
  import ViewCount from "src/ui/ViewCount.svelte";

  const routes = {
    "/count/:id/:date": ViewCount,
  };
</script>

<h1 class="mb-2 text-2xl font-bold">Toronto Open Data - Traffic Volumes</h1>

<main class="relative flex flex-grow flex-col">
  <Router {routes} />
  <Map />
</main>

<footer>
  <span>
    Data source:
    <a class="text-blue-700 underline" href="https://open.toronto.ca/dataset/traffic-volumes-at-intersections-for-all-modes/"> Toronto Open Data</a>
    (Last updated: {getUpdateDate()})
  </span> <br />
  Disclaimer: This web application is provided "as is". The author does not take responsibility for the accuracy of the provided information. Please do your due dilligence and apply engineering judgement.
</footer>
