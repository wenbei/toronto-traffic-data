<script lang="ts">
  import MapSearch from "./MapSearch.svelte";
  import { getAllIntersections } from "../api/toronto-open-data";

  let map: google.maps.Map;

  window.initMap = () => {
    const toronto = { lat: 43.7068153, lng: -79.4287613 };
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: toronto,
      zoom: 11,
      streetViewControl: false,
      rotateControl: false,
      tilt: 0,
      clickableIcons: false,
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

    addIntersectionMarkers(map);
  };

  async function addIntersectionMarkers(map) {
    const intersections = await getAllIntersections();

    intersections.forEach((location) => {
      const marker = new google.maps.Marker({
        position: {
          lat: location.lat,
          lng: location.lng,
        },
        map,
      });

      marker.addListener("click", () => {
        const info = new google.maps.InfoWindow({
          content: location.location,
        });

        info.open({
          anchor: marker,
          map,
          shouldFocus: true,
        });

        google.maps.event.addListener(map, "click", () => {
          info.close();
        });
      });
    });
  }
</script>

<MapSearch {map} />
<div id="map" />

<style>
  #map {
    height: 700px;
  }
</style>
