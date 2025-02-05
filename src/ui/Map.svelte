<script lang="ts">
import L from "leaflet";
  import "leaflet/dist/leaflet.css";

import "leaflet.markercluster";
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";

  import "leaflet-control-geocoder";
  import "leaflet-control-geocoder/Control.Geocoder.css";

  import { getLatestMetadata } from "src/api/toronto-open-data";
  import { onMount } from "svelte";

  let map: L.Map;

  onMount(() => {
    const toronto = { lat: 43.7356981, lng: -79.3707686 };
    map = L.map("map", {
      center: toronto,
      zoom: 11,
      closePopupOnClick: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // @ts-expect-error, no types for leaflet-control-geocoder
    const geocoder = L.Control.geocoder({
      collapsed: false,
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (result: any) => {
        map.fitBounds(result.geocode.bbox);
        geocoder.setQuery("");
      })
      .addTo(map);

    addIntersectionMarkers(map);
  });

  async function addIntersectionMarkers(map: L.Map) {
    const intersections = await getLatestMetadata();

    const markers = new L.MarkerClusterGroup({
      disableClusteringAtZoom: 15,
      showCoverageOnHover: false,
    });

    intersections.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude]).addTo(markers);
      const popup = L.popup({ autoClose: false }).setContent(`<b>${location.location_name}</b><br/>Latest Count: ${location.latest_count_date}`);
      marker.bindPopup(popup);
    });

    map.addLayer(markers);
  }
</script>

<div id="map" class="my-2 flex-grow bg-gray-300"></div>
