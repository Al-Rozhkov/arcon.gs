<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 800 250"
  >
    <image href="/img/schemes/2ss.png" width="800" height="240" y="10" x="0" />

    <template v-if="!tool">
      <text x="670" y="226">L<tspan dy="6">1</tspan></text>
      <text x="510" y="200">L<tspan dy="6">2</tspan></text>
      <text x="266" y="176">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 86 54)" x="86" y="54" class="anchor-start">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 736 26)" x="736" y="26">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="670" y="226">{{ tool.l1 }}</text>
      <text x="510" y="200">{{ tool.l2 }}</text>
      <text x="266" y="184">{{ tool.ap }}</text>
      <text transform="rotate(-90 30 142)" x="132" y="198">{{ tool.d1 }}</text>
      <text transform="rotate(-90 790 142)" x="906" y="94">{{ tool.d2 }}</text>
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
