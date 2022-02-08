<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 760 240"
  >
    <image href="/img/schemes/cylinder-conus.png" width="760" height="240" y="0" x="0" />

    <template v-if="!tool">
      <text x="388" y="212">L<tspan dy="6">1</tspan></text>
      <text x="160" y="168">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 34 90)" x="34" y="90">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 730 86)" x="730" y="86">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="388" y="212">{{ tool.l1 }}</text>
      <text x="160" y="168">{{ tool.ap }}</text>
      <text transform="rotate(-90 34 90)" x="34" y="90">{{ tool.d1 }}</text>
      <text transform="rotate(-90 730 86)" x="730" y="86">{{ tool.d2 }}</text>
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
