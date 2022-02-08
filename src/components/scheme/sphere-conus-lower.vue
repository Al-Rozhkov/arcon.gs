<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 755 240"
  >
    <image href="/img/schemes/sphere-conus-lower.png" width="755" height="234" y="6" x="0" />

    <template v-if="!tool">
      <text x="434" y="212">L<tspan dy="6">1</tspan></text>
      <text x="254" y="186">L<tspan dy="6">2</tspan></text>
      <text x="50" y="180" class="anchor-end">R</text>
      <text x="150" y="162">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 34 98)" x="34" y="98">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 730 94)" x="730" y="94">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 266 98)" x="266" y="98">D<tspan dy="6">3</tspan></text>
    </template>
    <template v-else>
      <text x="434" y="212">{{ tool.l1 }}</text>
      <text x="254" y="186">{{ tool.l2 }}</text>
      <text x="36" y="188" class="anchor-end">{{ tool.r }}</text>
      <text x="150" y="162">{{ tool.ap }}</text>
      <text transform="rotate(-90 34 98)" x="34" y="98">{{ tool.d1 }}</text>
      <text transform="rotate(-90 730 94)" x="730" y="94">{{ tool.d2 }}</text>
      <text transform="rotate(-90 270 98)" x="270" y="98">{{ tool.d3 }}</text>
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
