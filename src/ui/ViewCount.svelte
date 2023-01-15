<script lang="ts">
  export let params: {
    id: number;
    date: string;
  };

  import { pop } from "svelte-spa-router";

  import { getCountData } from "src/api/toronto-open-data";
  import { getPeakHourData } from "src/data/processCount";
  import TMC from "src/ui/TMC.svelte";

  let location: string;
  let countData = getCountData(params.id, params.date).then((data) => {
    location = data[0].location;
    return getPeakHourData(data);
  });
</script>

<div class="absolute top-0 w-full h-full z-10 py-2 bg-white flex flex-col">
  <div>
    <button on:click={pop} class="cursor-pointer p-1 px-2 border-2 border-black text-lg"> ⮜ Back </button>
    <h3 class="inline-block text-lg">{location} ({params.date})</h3>
  </div>

  <div class="flex flex-wrap justify-start content-start flex-grow py-2 gap-4">
    {#await countData then [peakHourDataAM, peakHourDataPM]}
      <TMC volumes={peakHourDataAM} />
      <TMC volumes={peakHourDataPM} />
    {/await}
  </div>
</div>
