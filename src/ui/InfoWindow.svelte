<script lang="ts">
  import type { CountMetadata } from "src/api/toronto-open-data";
  import { getCountData } from "src/api/toronto-open-data";

  export let location: string;
  export let countList: CountMetadata[];

  function viewCount(meta: CountMetadata) {
    // getCountData(meta);
    console.log(meta.count_id);
  }

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
        <button on:click={() => viewCount(count)}>View</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  #name {
    font-weight: bold;
  }
  #reverse {
    max-height: 12em;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  #list {
    margin: 0em;
  }
</style>
