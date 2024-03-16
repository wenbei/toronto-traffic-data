<script lang="ts">
  import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
  import { getAllIntersections, getCountList } from "src/api/toronto-open-data";
  import InfoWindow from "src/ui/InfoWindow.svelte";
  import MapSearch from "src/ui/MapSearch.svelte";

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
            location_id: location.location_id,
            countList: countList,
          },
        });

        const info = new google.maps.InfoWindow({
          content: infoElement,
          minWidth: 250,
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

    const algorithm = new SuperClusterAlgorithm({ radius: 100, maxZoom: 14 });

    const renderer = {
      render: ({ count, position }) => {
        // create svg url
        const svg = window.btoa(`
        <svg fill="#0000ff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
          <circle cx="120" cy="120" opacity="1.0" r="90" />
        </svg>`);

        // create marker using svg icon
        return new google.maps.Marker({
          position,
          icon: {
            url: `data:image/svg+xml;base64,${svg}`,
            scaledSize: new google.maps.Size(45, 45),
          },
          label: {
            text: String(count),
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
          },
          // adjust zIndex to be above other markers
          zIndex: 1000 + count,
        });
      },
    };

    new MarkerClusterer({ map, markers, algorithm, renderer });
  }
</script>

<svelte:head>
  <script async defer src={MAPS_API}></script>
</svelte:head>

<MapSearch {map} />
<div id="map" class="my-2 flex-grow bg-gray-300" />
