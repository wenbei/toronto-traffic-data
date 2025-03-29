<script lang="ts">
  import type { CountMetadata } from "src/api/toronto-open-data";

  import { push } from "svelte-spa-router";

  const { counts, location_name }: { counts: CountMetadata[]; location_name: string } = $props();

  const getWeekday = (date: string) => {
    return new Date(date).toLocaleDateString("en-CA", {
      weekday: "short",
      timeZone: "UTC",
    });
  };
</script>

<div class="font-bold">{location_name}</div>
<div class="my-1">Available Counts:</div>

<div class="flex max-h-30 min-w-[280px] flex-col overflow-auto">
  <ul class="list-inside list-disc">
    {#each counts as count}
      <li class="m-1 list-item">
        {count.count_date} ({getWeekday(count.count_date)}) [ID: {count.count_id}]
        <button onclick={() => push(`#/count/${count.count_id}/${count.count_date}`)} class="mx-1 rounded bg-gray-200 px-2 py-1"> View </button>
      </li>
    {/each}
  </ul>
</div>
