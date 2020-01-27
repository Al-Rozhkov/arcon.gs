<template>
  <div v-tooltip="tooltipText" class="icon-attr">
    <svg
      :width="width"
      :height="height"
      role="img"
    >
      <use
        v-if="cogs.cogsPitch === 'variable'"
        xlink:href="#cogs-variable"
      />
      <text
        transform="translate(25 20)"
        text-anchor="middle"
        class="svg-text-center"
      >{{ cogs.cogsNumber }}</text>
      <use :xlink:href="'#' + iconId" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    cogs: {
      type: Object,
      required: true
    },

    width: {
      type: Number,
      default: 50
    },

    height: {
      type: Number,
      default: 50
    }
  },

  computed: {
    iconId() {
      return this.cogs.noCuttingCenter ? 'cogs-base' : 'cogs-center-overlap'
    },
    
    tooltipText() {
      const pitch = (this.cogs.cogsPitch === 'variable') ? 'Переменный шаг зубьев' : 'Постоянный шаг зубьев'
      const center = this.cogs.noCuttingCenter ? 'Без режущего центра' : 'С перекрытием центра'
      
      return `Зубьев: ${this.cogs.cogsNumber}<br />${pitch}<br />${center}`
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/svg-icon.scss';
</style>
