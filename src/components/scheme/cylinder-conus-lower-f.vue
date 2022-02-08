<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 773 240"
  >
    <image href="/img/schemes/cylinder-conus-lower-f.png" width="763" height="234" x="10" y="6" />

    <template v-if="!tool">
      <text x="440" y="212">L<tspan dy="6">1</tspan></text>
      <text x="265" y="186">L<tspan dy="6">2</tspan></text>
      <text x="54" y="188" class="anchor-end">F</text>
      <text x="150" y="166">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 44 98)" x="44" y="98">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 744 94)" x="744" y="94">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 280 98)" x="280" y="98">D<tspan dy="6">3</tspan></text>
    </template>
    <template v-else>
      <text x="440" y="212">{{ tool.l1 }}</text>
      <text x="265" y="186">{{ tool.l2 }}</text>
      <text x="54" y="188" class="anchor-end">{{ tool.f45 }}</text>
      <text x="150" y="166">{{ tool.ap }}</text>
      <text transform="rotate(-90 44 98)" x="44" y="98">{{ tool.d1 }}</text>
      <text transform="rotate(-90 746 94)" x="746" y="94">{{ tool.d2 }}</text>
      <text transform="rotate(-90 280 98)" x="280" y="98">{{ tool.d3 }}</text>
    </template>
  </svg>
</template>

<script>
export default {
  props: {
    tool: {
      type: Object,
      default: null
    },
  },
}
</script>
