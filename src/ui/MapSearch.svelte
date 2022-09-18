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
    let request = {
      address: address,
    };
    geocoder
      .geocode(request)
      .then((response) => {
        let geocoderResult = response.results[0];
        map.panTo(geocoderResult.geometry.location);
        map.fitBounds(geocoderResult.geometry.viewport);
      })
      .catch((_) => {
        resultText = "No results found.";
      });
  }
</script>

<div id="search">
  <form on:submit|preventDefault={search}>
    <input bind:value={searchAddress} />
    <button type="submit">Search</button>
  </form>
  <span>{resultText}</span>
</div>

<style>
  #search {
    padding: 10px 0px;
  }
  input {
    height: 2em;
    width: 30%;
  }
  button {
    height: 2em;
  }
</style>
