<template>
  <div v-tooltip="tooltipText" class="icon-attr">
    <svg :width="width" :height="height" role="img">
      <use v-if="pitch === 'variable'" xlink:href="#cogs-variable" />
      <text
        transform="translate(25 20)"
        text-anchor="middle"
        class="svg-text-center cogs-number"
      >{{ cogsNumberValue }}</text>
      <use :xlink:href="'#' + iconId" />
    </svg>
  </div>
</template>

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
      return this.center ? 'cogs-base' : 'cogs-center-overlap'
    },

    tooltipText() {
      const pitch =
        this.pitch === 'variable'
          ? 'Переменный шаг зубьев'
          : 'Постоянный шаг зубьев'
      const center = this.center
        ? 'Без режущего центра'
        : 'С перекрытием центра'

      return `Зубьев: ${this.cogsNumberValue}<br />${pitch}<br />${center}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modules/svg-icon.scss';

.cogs-number {
  font-size: 0.85rem;
}
</style>
