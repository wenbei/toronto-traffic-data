<script lang="ts">
  export let map: google.maps.Map;

  let geocoder: google.maps.Geocoder;

  let searchAddress: string;
  function search() {
    geocode(searchAddress);
  }

  let resultText: string = "";
  function geocode(address: string) {
    if (!address) return;

    resultText = "";
    geocoder = geocoder ?? new google.maps.Geocoder();
    const request = {
      address: address,
    };
    geocoder
      .geocode(request)
      .then((response) => {
        const geocoderResult = response.results[0];
        map.panTo(geocoderResult.geometry.location);
        map.fitBounds(geocoderResult.geometry.viewport);
      })
      .catch((_) => {
        resultText = "No results found.";
      });
  }
</script>

<div>
  <form on:submit|preventDefault={search} class="flex">
    <input bind:value={searchAddress} class="flex-grow h-8 border-2 border-gray-300" />
    <button type="submit" class="mx-2 px-2 rounded bg-gray-300">Search</button>
  </form>
  <span>{resultText}</span>
</div>
