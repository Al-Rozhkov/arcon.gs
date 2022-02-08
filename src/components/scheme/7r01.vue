<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 762 270"
  >
    <image href="/img/schemes/7r01.png" width="762" height="258" y="12" x="0" />

    <template v-if="!tool">
      <text x="390" y="250">L<tspan dy="6">1</tspan></text>
      <text x="66" y="200" class="anchor-end">R</text>
      <text x="176" y="220" class="anchor-start">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 32 60)" x="32" y="60">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 740 130)" x="740" y="130">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="390" y="250">{{ tool.l1 }}</text>
      <text x="66" y="200" class="anchor-end">{{ tool.r }}</text>
      <text x="176" y="220" class="anchor-start">{{ tool.ap }}</text>
      <text transform="rotate(-90 32 60)" x="32" y="60">{{ tool.d1 }}</text>
      <text transform="rotate(-90 740 130)" x="740" y="130">{{ tool.d2 }}</text>
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
