<script lang="ts">
  import Map from "./ui/Map.svelte";

  const API_KEY = "AIzaSyCtfT5Dzc1cvrCJyqXfBdGiHQPVplmjSaM";
  const MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
</script>

<svelte:head>
  <script async defer src={MAPS_API}></script>
</svelte:head>

<main>
  <h1>Toronto Open Data - Traffic Volumes</h1>
  <Map />
</main>

<footer>
  Disclaimer: This web application is provided "as is". The author does not take
  responsibility for the accuracy of the provided information. Please do your
  due dilligence and apply engineering judgement.
</footer>

<style>
  footer {
    margin: 10px 0px;
  }
</style>
