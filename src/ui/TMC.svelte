<script lang="ts">
  import type { CountData } from "src/api/toronto-open-data";

  export let volumes: CountData & { PHF: number };
</script>

<div class="grid grid-cols-2 grid-rows-2 aspect-square min-w-[250px]">
  <div class="absolute p-1 outline outline-1">
    PHF: {volumes.PHF}
  </div>
  <div class="flex flex-col-reverse outline outline-1 gap-2 p-1">
    <div class="flex flex-row-reverse">
      <span class="vertical">🡿 {volumes.sb_cars_l}</span>
      <span class="vertical">🡸 {volumes.sb_cars_t}</span>
      <span class="vertical">🡼 {volumes.sb_cars_r}</span>
    </div>
    <div class="flex flex-row-reverse">
      <span class="vertical">({volumes.sb_truck_l})</span>
      <span class="vertical">({volumes.sb_truck_t})</span>
      <span class="vertical">({volumes.sb_truck_r})</span>
    </div>
  </div>

  <div class="flex outline outline-1 gap-2 p-1">
    <div class="flex flex-col-reverse">
      <span>🡿 {volumes.wb_cars_l}</span>
      <span>🡸 {volumes.wb_cars_t}</span>
      <span>🡼 {volumes.wb_cars_r}</span>
    </div>
    <div class="flex flex-col-reverse">
      <span>({volumes.wb_truck_l})</span>
      <span>({volumes.wb_truck_t})</span>
      <span>({volumes.wb_truck_r})</span>
    </div>
  </div>

  <div class="flex flex-row-reverse outline outline-1 gap-2 p-1">
    <div class="flex flex-col text-right">
      <span>{volumes.eb_cars_l} 🡽</span>
      <span>{volumes.eb_cars_t} 🡺</span>
      <span>{volumes.eb_cars_r} 🡾</span>
    </div>
    <div class="flex flex-col text-right">
      <span>({volumes.wb_truck_l})</span>
      <span>({volumes.wb_truck_t})</span>
      <span>({volumes.wb_truck_r})</span>
    </div>
  </div>

  <div class="flex flex-col outline outline-1 gap-2 p-1">
    <div class="flex text-right">
      <span class="vertical">{volumes.nb_cars_l} 🡽</span>
      <span class="vertical">{volumes.nb_cars_t} 🡺</span>
      <span class="vertical">{volumes.nb_cars_r} 🡾</span>
    </div>
    <div class="flex text-right">
      <span class="vertical">({volumes.nb_truck_l})</span>
      <span class="vertical">({volumes.nb_truck_t})</span>
      <span class="vertical">({volumes.nb_truck_r})</span>
    </div>
  </div>
</div>

<style>
  span.vertical {
    writing-mode: vertical-lr;
    transform: scale(-1);
  }
  span {
    @apply text-lg;
  }
</style>
