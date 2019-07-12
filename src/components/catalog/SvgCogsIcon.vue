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
      return !this.cogs.cogsCenter ? 'cogs-base' : 'cogs-center-overlap'
      // return this.cogs.cogsCenter === 'overlap' ? 'cogs-center-overlap' : 'cogs-center-cut'
    },
    
    tooltipText() {
      const pitch = (this.cogs.cogsPitch === 'variable') ? 'Переменный шаг зубьев' : 'Постоянный шаг зубьев'
      const center = (this.cogs.cogsCenter === 'overlap') ? 'С перекрытием центра' : 'Без режущего центра'
      
      return `Зубьев: ${this.cogs.cogsNumber}<br />${pitch}<br />${center}`
    }
  }
}
</script>

<style lang="scss">
.icon-attr {
  position: relative;
  display: inline-block;
  margin-right: .5rem;

  cursor: default;
}
</style>
