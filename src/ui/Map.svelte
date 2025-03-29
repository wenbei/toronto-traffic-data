<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  import "leaflet.markercluster";
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";

  import "leaflet-control-geocoder";
  import "leaflet-control-geocoder/Control.Geocoder.css";

  // workaround for missing icons during build, see https://github.com/Leaflet/Leaflet/issues/4968
  // @ts-expect-error
  delete L.Icon.Default.prototype._getIconUrl;

  import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png?no-inline";
  import markerIcon from "leaflet/dist/images/marker-icon.png?no-inline";
  import markerShadow from "leaflet/dist/images/marker-shadow.png?no-inline";
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
  });

  import { getCountList, getLatestMetadata } from "src/api/toronto-open-data";
  import InfoWindow from "src/ui/InfoWindow.svelte";
  import { mount, onMount } from "svelte";

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
      const popup = L.popup({ autoClose: false, maxWidth: 280, content: `<b>${location.location_name}</b><br/>Loading...` });
      marker.bindPopup(popup);
      marker.on("popupopen", async () => {
        const countList = await getCountList(location.location_name);
        const infoWindow = document.createElement("div");
        mount(InfoWindow, {
          target: infoWindow,
          props: {
            location_name: location.location_name,
            counts: countList,
          },
        });
        popup.setContent(infoWindow);
      });
    });

    map.addLayer(markers);

    L.control.layers(undefined, { Intersections: markers }, { position: "bottomleft", collapsed: false }).addTo(map);
  }
</script>

<div id="map" class="my-2 flex-grow bg-gray-300"></div>
