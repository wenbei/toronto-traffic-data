<script lang="ts">
  import { MarkerClusterer } from "@googlemaps/markerclusterer";
  import MapSearch from "src/ui/MapSearch.svelte";
  import InfoWindow from "src/ui/InfoWindow.svelte";
  import { getAllIntersections, getCountList } from "src/api/toronto-open-data";

  const API_KEY = "AIzaSyCtfT5Dzc1cvrCJyqXfBdGiHQPVplmjSaM";
  const MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

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

  async function addIntersectionMarkers(map: google.maps.Map) {
    const intersections = await getAllIntersections();

    const markers = [];
    intersections.forEach((location) => {
      const marker = new google.maps.Marker({
        position: {
          lat: location.lat,
          lng: location.lng,
        },
        map,
      });
      markers.push(marker);

      marker.addListener("click", async () => {
        const countList = await getCountList(location.location_id);

        const infoElement = document.createElement("div");

        new InfoWindow({
          target: infoElement,
          props: {
            location: location.location,
            countList: countList,
          },
        });

        const info = new google.maps.InfoWindow({
          content: infoElement,
        });

        info.open({
          anchor: marker,
          map,
          shouldFocus: true,
        });

        map.addListener("click", () => {
          info.close();
        });
      });
    });

    new MarkerClusterer({ map, markers });
  }
</script>

<svelte:head>
  <script async defer src={MAPS_API}></script>
</svelte:head>

<MapSearch {map} />
<div id="map" class="flex-grow my-2 bg-gray-300" />
