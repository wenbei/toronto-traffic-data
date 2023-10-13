<script lang="ts">
  import { push } from "svelte-spa-router";

  import type { CountMetadata } from "src/api/toronto-open-data";

  export let location: string;
  export let location_id: number;
  export let countList: CountMetadata[];

  const getWeekday = (date: string) => {
    return new Date(date).toLocaleDateString("en-CA", {
      weekday: "short",
      timeZone: "UTC",
    });
  };
</script>

<div class="font-bold">{location} (ID: {location_id})</div>
<div class="my-1">Available Counts (YYYY-MM-DD):</div>

<div class="flex flex-col-reverse overflow-auto max-h-40">
  <ul class="list-disc list-inside">
    {#each countList as count}
      <li class="list-item m-1">
        {count.count_date} ({getWeekday(count.count_date)})
        <button on:click={() => push(`#/count/${count.count_id}/${count.count_date}`)} class="mx-2 px-2 py-1 rounded bg-gray-200"> View </button>
      </li>
    {/each}
  </ul>
</div>
