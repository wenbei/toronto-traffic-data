<script lang="ts">
  const API_KEY = "AIzaSyCtfT5Dzc1cvrCJyqXfBdGiHQPVplmjSaM";
  const MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

  window.initMap = () => {
    const toronto = { lat: 43.7068153, lng: -79.4287613 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: toronto,
        zoom: 11,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      }
    );
  };
</script>

<svelte:head>
  <script async defer src={MAPS_API}></script>
</svelte:head>

<div id="map" />

<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>
