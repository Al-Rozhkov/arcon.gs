<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 806 276"
  >
    <image href="/img/schemes/mf.png" width="806" height="276" y="0" x="0" />

    <template v-if="!tool">
      <text x="560" y="254">L<tspan dy="6">1</tspan></text>
      <text x="244" y="230">a<tspan dy="6">p</tspan></text>
      <text transform="rotate(-90 30 130)" x="30" y="130">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 790 130)" x="790" y="130">D<tspan dy="6">2</tspan></text>
      <text transform="rotate(38 180 30)" x="180" y="30">α°</text>
    </template>
    <template v-else>
      <text y="262" x="560">{{ tool.l1 }}</text>
      <text y="240" x="244">{{ tool.ap }}</text>
      <text transform="rotate(-90 30 142)" x="30" y="142">{{ tool.d1 }}</text>
      <text transform="rotate(-90 790 142)" x="790" y="142">{{ tool.d2 }}</text>
      <text transform="rotate(38 190 38)" x="190" y="38">{{ tool.a }}</text>
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
