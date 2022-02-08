<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 814 193"
  >
    <image href="/img/schemes/thread.png" width="814" height="193" y="0" x="0" />

    <template v-if="!tool">
      <text x="560" y="172">L<tspan dy="6">1</tspan></text>
      <text x="220" y="136">L<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 30 58)" x="30" y="58">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 790 58)" x="790" y="58">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="420" y="180">{{ tool.l1 }}</text>
      <text x="220" y="154">{{ tool.ap }}</text>
      <text transform="rotate(-90 30 58)" x="30" y="58">{{ tool.d1 }}</text>
      <text transform="rotate(-90 738 58)" x="738" y="58">{{ tool.d2 }}</text>
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
