<script lang="ts">
  import type { CountMetadata } from "src/api/toronto-open-data";

  export let location: string;
  export let countList: CountMetadata[];
</script>

<div>{location}</div>

<ul>
  {#each countList as count}
    <li>{count.count_date}</li>
  {/each}
</ul>
