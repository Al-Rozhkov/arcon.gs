<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 770 209"
  >
    <image href="/img/schemes/radius-r.png" width="770" height="209" x="0" y="0" />

    <template v-if="!tool">
      <text x="404" y="180">L<tspan dy="6">1</tspan></text>
      <text x="220" y="154">a<tspan dy="6">p</tspan></text>
      <text x="60" y="160" class="anchor-end">R</text>
      <text transform="rotate(-90 30 58)" x="30" y="58">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 738 58)" x="738" y="58">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="404" y="180">{{ tool.l1 }}</text>
      <text x="220" y="154">{{ tool.ap }}</text>
      <text x="60" y="160" class="anchor-end">{{ tool.r }}</text>
      <text transform="rotate(-90 30 58)" x="30" y="58">{{ tool.d1 }}</text>
      <text transform="rotate(-90 744 58)" x="744" y="58">{{ tool.d2 }}</text>
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
