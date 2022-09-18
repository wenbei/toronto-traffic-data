<script lang="ts">
  import MapSearch from "./MapSearch.svelte";

  let map: google.maps.Map;

  window.initMap = () => {
    const toronto = { lat: 43.7068153, lng: -79.4287613 };
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: toronto,
      zoom: 11,
      streetViewControl: false,
      rotateControl: false,
      tilt: 0,
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
    });
  };
</script>

<MapSearch {map} />
<div id="map" />

<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>
