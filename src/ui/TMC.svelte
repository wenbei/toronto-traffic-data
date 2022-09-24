<script lang="ts">
  import type { CountData } from "src/api/toronto-open-data";

  export let volumes: CountData & { PHF: number };
</script>

<div class="square grid">
  <div id="SB" class="v-flex-reverse">
    <div class="h-flex-reverse">
      <span class="vertical">🡿 {volumes.sb_cars_l}</span>
      <span class="vertical">🡸 {volumes.sb_cars_t}</span>
      <span class="vertical">🡼 {volumes.sb_cars_r}</span>
    </div>
    <div class="h-flex-reverse">
      <span class="vertical">({volumes.sb_truck_l})</span>
      <span class="vertical">({volumes.sb_truck_t})</span>
      <span class="vertical">({volumes.sb_truck_r})</span>
    </div>
  </div>

  <div id="WB" class="h-flex">
    <div class="v-flex-reverse">
      <span>🡿 {volumes.wb_cars_l}</span>
      <span>🡸 {volumes.wb_cars_t}</span>
      <span>🡼 {volumes.wb_cars_r}</span>
    </div>
    <div class="v-flex-reverse">
      <span>({volumes.wb_truck_l})</span>
      <span>({volumes.wb_truck_t})</span>
      <span>({volumes.wb_truck_r})</span>
    </div>
  </div>

  <div id="EB" class="h-flex-reverse">
    <div class="v-flex">
      <span>{volumes.eb_cars_l} 🡽</span>
      <span>{volumes.eb_cars_t} 🡺</span>
      <span>{volumes.eb_cars_r} 🡾</span>
    </div>
    <div class="v-flex">
      <span>({volumes.wb_truck_l})</span>
      <span>({volumes.wb_truck_t})</span>
      <span>({volumes.wb_truck_r})</span>
    </div>
  </div>

  <div id="NB" class="v-flex">
    <div class="h-flex">
      <span class="vertical">{volumes.nb_cars_l} 🡽</span>
      <span class="vertical">{volumes.nb_cars_t} 🡺</span>
      <span class="vertical">{volumes.nb_cars_r} 🡾</span>
    </div>
    <div class="h-flex">
      <span class="vertical">({volumes.nb_truck_l})</span>
      <span class="vertical">({volumes.nb_truck_t})</span>
      <span class="vertical">({volumes.nb_truck_r})</span>
    </div>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-areas:
      "SB WB"
      "EB NB";
  }
  .h-flex {
    display: flex;
  }
  .h-flex-reverse {
    display: flex;
    flex-direction: row-reverse;
  }
  .v-flex {
    display: flex;
    flex-direction: column;
  }
  .v-flex-reverse {
    display: flex;
    flex-direction: column-reverse;
  }

  .vertical {
    writing-mode: vertical-lr;
    transform: scale(-1);
  }

  #WB,
  #SB,
  #NB,
  #EB {
    gap: 10px;
    padding: 5px;
  }

  #EB > div,
  #NB > div {
    text-align: right;
  }

  span {
    font-size: 1.2em;
    line-height: 1.2em;
    padding: 2px;
    /* border: 1px solid black; */
  }

  .grid > div {
    border: 1px solid black;
  }
  .square {
    /* height: 300px;
    width: 300px; */
    /* border: 1px solid black; */
    padding: 10px;
  }
</style>
