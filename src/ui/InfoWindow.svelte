<script lang="ts">
  import { push } from "svelte-spa-router";

  import type { CountMetadata } from "src/api/toronto-open-data";

  export let location: string;
  export let countList: CountMetadata[];

  const getWeekday = (date: string) => {
    return new Date(date).toLocaleDateString("en-CA", {
      weekday: "short",
    });
  };
</script>

<div id="name">{location}</div>
<div>Available Counts (YYYY-MM-DD)</div>
<div id="reverse">
  <ul id="list">
    {#each countList as count}
      <li>
        {count.count_date} ({getWeekday(count.count_date)})
        <button
          on:click={() => push(`#/count/${count.count_id}/${count.count_date}`)}
          >View</button
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  #reverse {
    max-height: 12em;
    max-width: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  #name {
    font-weight: bold;
  }
  #list {
    margin: 0em;
  }
</style>
