<script lang="ts">
  import { onMount } from "svelte";
  import { querystring, pop } from "svelte-spa-router";

  export let params: {
    id: number;
    date: string;
  };

  import { getCountData } from "src/api/toronto-open-data";
  import { getPeakHourData, t } from "src/data/processCount";
  import TMC from "src/ui/TMC.svelte";

  let data;

  // onMount(async () => {
  //   data = await getCountData(
  //     params.id,
  //     new URLSearchParams($querystring).get("date")
  //   );
  //   getPeakHourData(data);
  // });
  // t();
</script>

<span id="back" on:click={pop}><h3>⮜ Back</h3></span>

<h3>Count</h3>
{params.id}
{params.date}

<div id="TMC">
  <TMC />
  <TMC />
</div>

<style>
  #back {
    cursor: pointer;
  }
  #TMC {
    display: flex;
    flex-wrap: wrap;
  }
</style>
