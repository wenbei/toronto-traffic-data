<script lang="ts">
  import type { CountData } from "src/api/toronto-open-data";

  export let volumes: CountData & { PHF: number };
</script>

<div class="relative grid aspect-square min-w-[250px] grid-cols-2 grid-rows-2">
  <div class="absolute right-0 p-1 outline outline-1">
    PHF: {volumes.PHF}
  </div>
  <div class="flex flex-col-reverse gap-2 p-1 outline outline-1">
    <div class="flex flex-row-reverse">
      <span class="vertical">🡿 {volumes.sb_cars_l + volumes.sb_truck_l + volumes.sb_bus_l}</span>
      <span class="vertical">🡸 {volumes.sb_cars_t + volumes.sb_truck_t + volumes.sb_bus_t}</span>
      <span class="vertical">🡼 {volumes.sb_cars_r + volumes.sb_truck_r + volumes.sb_bus_r}</span>
    </div>
    <div class="flex flex-row-reverse">
      <span class="vertical">({Math.round(((volumes.sb_truck_l + volumes.sb_bus_l) / (volumes.sb_cars_l + volumes.sb_truck_l + volumes.sb_bus_l)) * 100)}%)</span>
      <span class="vertical">({Math.round(((volumes.sb_truck_t + volumes.sb_bus_t) / (volumes.sb_cars_t + volumes.sb_truck_t + volumes.sb_bus_t)) * 100)}%)</span>
      <span class="vertical">({Math.round(((volumes.sb_truck_r + volumes.sb_bus_r) / (volumes.sb_cars_r + volumes.sb_truck_r + volumes.sb_bus_r)) * 100)}%)</span>
    </div>
  </div>

  <div class="flex gap-2 p-1 outline outline-1">
    <div class="flex flex-col-reverse">
      <span>🡿 {volumes.wb_cars_l + volumes.wb_truck_l + volumes.wb_bus_l}</span>
      <span>🡸 {volumes.wb_cars_t + volumes.wb_truck_t + volumes.wb_bus_t}</span>
      <span>🡼 {volumes.wb_cars_r + volumes.wb_truck_r + volumes.wb_bus_r}</span>
    </div>
    <div class="flex flex-col-reverse">
      <span>({Math.round(((volumes.wb_truck_l + volumes.wb_bus_l) / (volumes.wb_cars_l + volumes.wb_truck_l + volumes.wb_bus_l)) * 100)}%)</span>
      <span>({Math.round(((volumes.wb_truck_t + volumes.wb_bus_t) / (volumes.wb_cars_t + volumes.wb_truck_t + volumes.wb_bus_t)) * 100)}%)</span>
      <span>({Math.round(((volumes.wb_truck_r + volumes.wb_bus_r) / (volumes.wb_cars_r + volumes.wb_truck_r + volumes.wb_bus_r)) * 100)}%)</span>
    </div>
  </div>

  <div class="flex flex-row-reverse gap-2 p-1 outline outline-1">
    <div class="flex flex-col text-right">
      <span>{volumes.eb_cars_l + volumes.eb_truck_l + volumes.eb_bus_l} 🡽</span>
      <span>{volumes.eb_cars_t + volumes.eb_truck_t + volumes.eb_bus_t} 🡺</span>
      <span>{volumes.eb_cars_r + volumes.eb_truck_r + volumes.eb_bus_r} 🡾</span>
    </div>
    <div class="flex flex-col text-right">
      <span>({Math.round(((volumes.eb_truck_l + volumes.eb_bus_l) / (volumes.eb_cars_l + volumes.eb_truck_l + volumes.eb_bus_l)) * 100)}%)</span>
      <span>({Math.round(((volumes.eb_truck_t + volumes.eb_bus_t) / (volumes.eb_cars_t + volumes.eb_truck_t + volumes.eb_bus_t)) * 100)}%)</span>
      <span>({Math.round(((volumes.eb_truck_r + volumes.eb_bus_r) / (volumes.eb_cars_r + volumes.eb_truck_r + volumes.eb_bus_r)) * 100)}%)</span>
    </div>
  </div>

  <div class="flex flex-col gap-2 p-1 outline outline-1">
    <div class="flex text-right">
      <span class="vertical">{volumes.nb_cars_l + volumes.nb_truck_l + volumes.nb_bus_l} 🡽</span>
      <span class="vertical">{volumes.nb_cars_t + volumes.nb_truck_t + volumes.nb_bus_t} 🡺</span>
      <span class="vertical">{volumes.nb_cars_r + volumes.nb_truck_r + volumes.nb_bus_r} 🡾</span>
    </div>
    <div class="flex text-right">
      <span class="vertical">({Math.round(((volumes.nb_truck_l + volumes.nb_bus_l) / (volumes.nb_cars_l + volumes.nb_truck_l + volumes.nb_bus_l)) * 100)}%)</span>
      <span class="vertical">({Math.round(((volumes.nb_truck_t + volumes.nb_bus_t) / (volumes.nb_cars_t + volumes.nb_truck_t + volumes.nb_bus_t)) * 100)}%)</span>
      <span class="vertical">({Math.round(((volumes.nb_truck_r + volumes.nb_bus_r) / (volumes.nb_cars_r + volumes.nb_truck_r + volumes.nb_bus_r)) * 100)}%)</span>
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
