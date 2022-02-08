<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 780 219"
  >
    <image href="/img/schemes/cylinder-f-small.png" width="770" height="219" x="10" y="0" />

    <template v-if="!tool">
      <text x="420" y="186">L<tspan dy="6">1</tspan></text>
      <text x="190" y="148">a<tspan dy="6">p</tspan></text>
      <text x="64" y="160" class="anchor-end">F</text>
      <text transform="rotate(-90 36 60)" x="36" y="60">D<tspan dy="6">1</tspan></text>
      <text transform="rotate(-90 750 60)" x="750" y="60">D<tspan dy="6">2</tspan></text>
    </template>
    <template v-else>
      <text x="420" y="186">{{ tool.l1 }}</text>
      <text x="190" y="148">{{ tool.ap }}</text>
      <text x="64" y="160" class="anchor-end">{{ tool.f45 }}</text>
      <text transform="rotate(-90 36 60)" x="36" y="60">{{ tool.d1 }}</text>
      <text transform="rotate(-90 750 60)" x="750" y="60">{{ tool.d2 }}</text>
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
