<template>
  <div v-tooltip="tooltipText" class="icon-attr">
    <svg :width="width" :height="height" role="img">
      <use v-if="pitch === 'variable'" xlink:href="#cogs-variable" />
      <text
        transform="translate(25 20)"
        text-anchor="middle"
        class="svg-text-center cogs-number"
      >{{ cogsNumberValue }}</text>
      <use :xlink:href="iconId" />
    </svg>
  </div>
</template>

<static-query>
query {
  tCogsNum: t(id: "catalog.cogs.num") {
    value
  }
  tPitchVariable: t(id: "catalog.cogs.pitch-variable") {
    value
  }
  tPitchPermanent: t(id: "catalog.cogs.pitch-permanent") {
    value
  }
  tCuttingCenter: t(id: "catalog.cogs.cutting-center") {
    value
  }
  tNoCuttingCenter: t(id: "catalog.cogs.no-cutting-center") {
    value
  }
}
</static-query>

<script>
export default {
  props: {
    number: {
      type: Array,
      required: true,
    },

    pitch: {
      type: String,
      required: true,
    },

    center: {
      type: String | Boolean,
      required: false,
    },

    width: {
      type: Number,
      default: 50,
    },

    height: {
      type: Number,
      default: 50,
    },
  },

  computed: {
    cogsNumberValue() {
      return this.number.length > 1
        ? Math.min(...this.number) + '—' + Math.max(...this.number)
        : this.number[0]
    },

    iconId() {
      return this.center ? '#cogs-base' : '#cogs-center-overlap'
    },

    tooltipText() {
      const pitch =
        this.pitch === 'variable'
          ? this.$static.tPitchVariable.value
          : this.$static.tPitchPermanent.value
      const center = this.center
        ? this.$static.tNoCuttingCenter.value
        : this.$static.tCuttingCenter.value

      return `${this.$static.tCogsNum.value}: ${this.cogsNumberValue}<br />${pitch}<br />${center}`
    },
  },
}
</script>

<style lang="scss" scoped>
.cogs-number {
  font-size: 0.85rem;
}
</style>
