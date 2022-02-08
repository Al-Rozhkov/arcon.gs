<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 767 240"
  >
    <image href="/img/schemes/radius-conus-lower-r.png" width="757" height="234" x="10" y="6" />

    <template v-if="!tool">
      <text x="434" y="212">L<tspan dy="6">1</tspan></text>
      <text x="254" y="186">L<tspan dy="6">2</tspan></text>
      <text x="60" y="180" class="anchor-end">R</text>
      <text x="156" y="164">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 34 98)" x="34" y="98">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 740 94)" x="740" y="94">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 272 98)" x="272" y="98">D<tspan dy="6">3</tspan></text>
    </template>
    <template v-else>
      <text x="434" y="212">{{ tool.l1 }}</text>
      <text x="254" y="186">{{ tool.l2 }}</text>
      <text x="60" y="180" class="anchor-end">{{ tool.r }}</text>
      <text x="156" y="168">{{ tool.ap }}</text>
      <text transform="rotate(-90 34 98)" x="34" y="98">{{ tool.d1 }}</text>
      <text transform="rotate(-90 740 94)" x="740" y="94">{{ tool.d2 }}</text>
      <text transform="rotate(-90 272 98)" x="272" y="98">{{ tool.d3 }}</text>
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
