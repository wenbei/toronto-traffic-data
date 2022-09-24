<script lang="ts">
  export let volumes = {
    carLeft: 1111,
    carThrough: 22,
    carRight: 33,
    heavyLeft: 44,
    heavyThrough: 55,
    heavyRight: 66,
  };
</script>

<div class="square grid">
  <div id="SB" class="v-flex-reverse">
    <div class="h-flex-reverse">
      <span class="vertical">🡿 {volumes.carLeft}</span>
      <span class="vertical">🡸 {volumes.carThrough}</span>
      <span class="vertical">🡼 {volumes.carRight}</span>
    </div>
    <div class="h-flex-reverse">
      <span class="vertical">({volumes.heavyLeft})</span>
      <span class="vertical">({volumes.heavyThrough})</span>
      <span class="vertical">({volumes.heavyRight})</span>
    </div>
  </div>

  <div id="WB" class="h-flex">
    <div class="v-flex-reverse">
      <span>🡿 {volumes.carLeft}</span>
      <span>🡸 {volumes.carThrough}</span>
      <span>🡼 {volumes.carRight}</span>
    </div>
    <div class="v-flex-reverse">
      <span>({volumes.heavyLeft})</span>
      <span>({volumes.heavyThrough})</span>
      <span>({volumes.heavyRight})</span>
    </div>
  </div>

  <div id="EB" class="h-flex-reverse">
    <div class="v-flex">
      <span>{volumes.carLeft} 🡽</span>
      <span>{volumes.carThrough} 🡺</span>
      <span>{volumes.carRight} 🡾</span>
    </div>
    <div class="v-flex">
      <span>({volumes.heavyLeft})</span>
      <span>({volumes.heavyRight})</span>
      <span>({volumes.heavyThrough})</span>
    </div>
  </div>

  <div id="NB" class="v-flex">
    <div class="h-flex">
      <span class="vertical">{volumes.carLeft} 🡽</span>
      <span class="vertical">{volumes.carThrough} 🡺</span>
      <span class="vertical">{volumes.carRight} 🡾</span>
    </div>
    <div class="h-flex">
      <span class="vertical">({volumes.heavyLeft})</span>
      <span class="vertical">({volumes.heavyThrough})</span>
      <span class="vertical">({volumes.heavyRight})</span>
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
    border: 1px solid black;
  }

  .grid > div {
    border: 1px solid black;
  }
  .square {
    /* height: 300px;
    width: 300px; */
    border: 1px solid black;
  }
</style>
