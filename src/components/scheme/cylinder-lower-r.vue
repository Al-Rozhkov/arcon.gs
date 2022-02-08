<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 780 249"
  >
    <image href="/img/schemes/cylinder-lower-f.png" width="770" height="249" x="10" y="0" />

    <template v-if="!tool">
      <text x="540" y="220">L<tspan dy="6">1</tspan></text>
      <text x="320" y="184">L<tspan dy="6">2</tspan></text>
      <text x="190" y="154">a<tspan dy="6">p</tspan></text>
      <text x="56" y="160" class="anchor-end">R</text>
      <text transform="rotate(-90 30 58)" x="30" y="58">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 750 58)" x="750" y="58">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 346 58)" x="346" y="58">D<tspan dy="6">3</tspan></text>
    </template>
    <template v-else>
      <text x="540" y="220">{{ tool.l1 }}</text>
      <text x="320" y="184">{{ tool.l2 }}</text>
      <text x="190" y="154">{{ tool.ap }}</text>
      <text x="64" y="160" class="anchor-end">{{ tool.r }}</text>
      <text transform="rotate(-90 30 58)" x="30" y="58">{{ tool.d1 }}</text>
      <text transform="rotate(-90 750 58)" x="750" y="58">{{ tool.d2 }}</text>
      <text transform="rotate(-90 344 58)" x="344" y="58">{{ tool.d3 }}</text>
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
