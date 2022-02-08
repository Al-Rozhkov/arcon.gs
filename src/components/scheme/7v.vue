<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 816 260"
  >
    <image href="/img/schemes/7v.png" width="816" height="248" y="12" x="0" />

    <template v-if="!tool">
      <text x="410" y="240">L<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 170 40)" x="170" y="40" class="anchor-start">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 792 130)" x="792" y="130">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(-90 88 72)" x="88" y="72" class="anchor-start">D<tspan dy="6">3</tspan></text>
      <text transform="rotate(-90 40 130)" x="40" y="130">α°</text>
    </template>
    <template v-else>
      <text x="410" y="240">{{ tool.l1 }}</text>
      <text transform="rotate(-90 170 40)" x="170" y="40" class="anchor-start">{{ tool.d1 }}</text>
      <text transform="rotate(-90 792 130)" x="792" y="130">{{ tool.d2 }}</text>
      <text transform="rotate(-90 88 72)" x="88" y="72" class="anchor-start">{{ tool.d3 }}</text>
      <text transform="rotate(-90 40 130)" x="40" y="130">{{ tool.a }}</text>
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
