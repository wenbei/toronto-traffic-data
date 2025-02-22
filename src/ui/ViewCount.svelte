<script lang="ts">
  const { params } = $props();

  import { getCountData } from "src/api/toronto-open-data";
  import { pop } from "svelte-spa-router";
  // import { getPeakHourData } from "src/data/processCount";

  // let location_name: string;
  // let countData = getCountData(params.id, params.date).then((data) => {
  //   location_name = data[0].location_name;
  //   return getPeakHourData(data);
  // });
  const countData = getCountData(params.id, params.date).then((data) => {
    console.log(data);
    return data;
  });
</script>

<div class="absolute top-0 z-10000 flex h-full w-full flex-col bg-white py-2">
  <div>
    <button onclick={pop} class="cursor-pointer border-2 border-black px-2 py-1 text-lg"> ⮜ Back </button>
    <!-- <h3 class="inline-block text-lg">{location_name} ({params.date})</h3> -->
    <h3 class="inline-block text-lg">{params.id} ({params.date})</h3>
    <!-- <h3 class="inline-block text-lg">{id} ({date})</h3> -->
  </div>
  <!-- <TMC /> -->

  <!-- <div class="flex flex-grow flex-wrap content-start justify-start gap-4 py-2">
    {#await countData then [peakHourDataAM, peakHourDataPM]}
      <TMC volumes={peakHourDataAM} />
      <TMC volumes={peakHourDataPM} />
    {/await}
  </div> -->
</div>
