<script lang="ts">
  export let params: {
    id: number;
    date: string;
  };

  import { pop } from "svelte-spa-router";

  import { getCountData } from "src/api/toronto-open-data";
  import TMC from "src/ui/TMC.svelte";
  import { getPeakHourData } from "src/data/processCount";

  let location: string;
  let countData = getCountData(params.id, params.date).then((data) => {
    location = data[0].location;
    return getPeakHourData(data);
  });
</script>

<div>
  <span id="back" on:click={pop}><h3>⮜ Back</h3></span>
  <h3>{location}</h3>
</div>

<div id="TMC">
  {#await countData then [peakHourDataAM, peakHourDataPM]}
    <TMC volumes={peakHourDataAM} />
    <TMC volumes={peakHourDataPM} />
  {/await}
</div>

<style>
  #back {
    cursor: pointer;
    padding: 5px;
    outline: 2px solid black;
  }
  h3 {
    display: inline-block;
  }
  #TMC {
    display: flex;
    flex-wrap: wrap;
  }
</style>
