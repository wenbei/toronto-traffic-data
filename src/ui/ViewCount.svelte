<script lang="ts">
  export let params: {
    id: number;
    date: string;
  };

  import { pop } from "svelte-spa-router";

  import { getCountData } from "src/api/toronto-open-data";
  import { getPeakHourData } from "src/data/processCount";
  import TMC from "src/ui/TMC.svelte";

  let location_name: string;
  let countData = getCountData(params.id, params.date).then((data) => {
    location_name = data[0].location_name;
    return getPeakHourData(data);
  });
</script>

<div class="absolute top-0 z-10 flex h-full w-full flex-col bg-white py-2">
  <div>
    <button on:click={pop} class="cursor-pointer border-2 border-black p-1 px-2 text-lg"> ⮜ Back </button>
    <h3 class="inline-block text-lg">{location_name} ({params.date})</h3>
  </div>

  <div class="flex flex-grow flex-wrap content-start justify-start gap-4 py-2">
    {#await countData then [peakHourDataAM, peakHourDataPM]}
      <TMC volumes={peakHourDataAM} />
      <TMC volumes={peakHourDataPM} />
    {/await}
  </div>
</div>
