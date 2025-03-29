<script lang="ts">
  import type { CountData } from "src/api/toronto-open-data";

  let { volumes }: { volumes: CountData & { PHF: number } } = $props();
</script>

<div class="relative grid aspect-square min-w-[250px] grid-cols-2 grid-rows-2">
  <div class="absolute right-0 p-1 outline">
    PHF: {volumes.PHF}
  </div>
  <div class="flex flex-col-reverse gap-2 p-1 outline">
    <div class="flex flex-row-reverse">
      <span class="sideways-up text-lg">🡿 {volumes.n_appr_cars_l + volumes.n_appr_truck_l + volumes.n_appr_bus_l}</span>
      <span class="sideways-up text-lg">🡸 {volumes.n_appr_cars_t + volumes.n_appr_truck_t + volumes.n_appr_bus_t}</span>
      <span class="sideways-up text-lg">🡼 {volumes.n_appr_cars_r + volumes.n_appr_truck_r + volumes.n_appr_bus_r}</span>
    </div>
    <div class="flex flex-row-reverse">
      <span class="sideways-up text-lg">({Math.round(((volumes.n_appr_truck_l + volumes.n_appr_bus_l) / (volumes.n_appr_cars_l + volumes.n_appr_truck_l + volumes.n_appr_bus_l) || 0) * 100)}%)</span>
      <span class="sideways-up text-lg">({Math.round(((volumes.n_appr_truck_t + volumes.n_appr_bus_t) / (volumes.n_appr_cars_t + volumes.n_appr_truck_t + volumes.n_appr_bus_t) || 0) * 100)}%)</span>
      <span class="sideways-up text-lg">({Math.round(((volumes.n_appr_truck_r + volumes.n_appr_bus_r) / (volumes.n_appr_cars_r + volumes.n_appr_truck_r + volumes.n_appr_bus_r) || 0) * 100)}%)</span>
    </div>
  </div>

  <div class="flex gap-2 p-1 outline">
    <div class="flex flex-col-reverse">
      <span class="text-lg">🡿 {volumes.e_appr_cars_l + volumes.e_appr_truck_l + volumes.e_appr_bus_l}</span>
      <span class="text-lg">🡸 {volumes.e_appr_cars_t + volumes.e_appr_truck_t + volumes.e_appr_bus_t}</span>
      <span class="text-lg">🡼 {volumes.e_appr_cars_r + volumes.e_appr_truck_r + volumes.e_appr_bus_r}</span>
    </div>
    <div class="flex flex-col-reverse">
      <span class="text-lg">({Math.round(((volumes.e_appr_truck_l + volumes.e_appr_bus_l) / (volumes.e_appr_cars_l + volumes.e_appr_truck_l + volumes.e_appr_bus_l) || 0) * 100)}%)</span>
      <span class="text-lg">({Math.round(((volumes.e_appr_truck_t + volumes.e_appr_bus_t) / (volumes.e_appr_cars_t + volumes.e_appr_truck_t + volumes.e_appr_bus_t) || 0) * 100)}%)</span>
      <span class="text-lg">({Math.round(((volumes.e_appr_truck_r + volumes.e_appr_bus_r) / (volumes.e_appr_cars_r + volumes.e_appr_truck_r + volumes.e_appr_bus_r) || 0) * 100)}%)</span>
    </div>
  </div>

  <div class="flex flex-row-reverse gap-2 p-1 outline">
    <div class="flex flex-col text-right">
      <span class="text-lg">{volumes.w_appr_cars_l + volumes.w_appr_truck_l + volumes.w_appr_bus_l} 🡽</span>
      <span class="text-lg">{volumes.w_appr_cars_t + volumes.w_appr_truck_t + volumes.w_appr_bus_t} 🡺</span>
      <span class="text-lg">{volumes.w_appr_cars_r + volumes.w_appr_truck_r + volumes.w_appr_bus_r} 🡾</span>
    </div>
    <div class="flex flex-col text-right">
      <span class="text-lg">({Math.round(((volumes.w_appr_truck_l + volumes.w_appr_bus_l) / (volumes.w_appr_cars_l + volumes.w_appr_truck_l + volumes.w_appr_bus_l) || 0) * 100)}%)</span>
      <span class="text-lg">({Math.round(((volumes.w_appr_truck_t + volumes.w_appr_bus_t) / (volumes.w_appr_cars_t + volumes.w_appr_truck_t + volumes.w_appr_bus_t) || 0) * 100)}%)</span>
      <span class="text-lg">({Math.round(((volumes.w_appr_truck_r + volumes.w_appr_bus_r) / (volumes.w_appr_cars_r + volumes.w_appr_truck_r + volumes.w_appr_bus_r) || 0) * 100)}%)</span>
    </div>
  </div>

  <div class="flex flex-col gap-2 p-1 outline">
    <div class="flex text-right">
      <span class="sideways-down text-lg">🡿 {volumes.s_appr_cars_l + volumes.s_appr_truck_l + volumes.s_appr_bus_l}</span>
      <span class="sideways-down text-lg">🡸 {volumes.s_appr_cars_t + volumes.s_appr_truck_t + volumes.s_appr_bus_t}</span>
      <span class="sideways-down text-lg">🡼 {volumes.s_appr_cars_r + volumes.s_appr_truck_r + volumes.s_appr_bus_r}</span>
    </div>
    <div class="flex text-right">
      <span class="sideways-down text-lg">({Math.round(((volumes.s_appr_truck_l + volumes.s_appr_bus_l) / (volumes.s_appr_cars_l + volumes.s_appr_truck_l + volumes.s_appr_bus_l) || 0) * 100)}%)</span>
      <span class="sideways-down text-lg">({Math.round(((volumes.s_appr_truck_t + volumes.s_appr_bus_t) / (volumes.s_appr_cars_t + volumes.s_appr_truck_t + volumes.s_appr_bus_t) || 0) * 100)}%)</span>
      <span class="sideways-down text-lg">({Math.round(((volumes.s_appr_truck_r + volumes.s_appr_bus_r) / (volumes.s_appr_cars_r + volumes.s_appr_truck_r + volumes.s_appr_bus_r) || 0) * 100)}%)</span>
    </div>
  </div>
</div>

<style>
  span.sideways-down {
    writing-mode: sideways-rl;
  }
  span.sideways-up {
    writing-mode: sideways-lr;
  }
</style>
