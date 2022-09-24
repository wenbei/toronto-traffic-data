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
  <h1>Toronto Open Data - Traffic Volumes</h1>
  <Router {routes} />
</main>
