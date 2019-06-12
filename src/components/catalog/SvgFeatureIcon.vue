<template>
  <div v-tooltip="tooltipText" class="icon-attr">
    <svg
      :width="width"
      :height="height"
      role="img"
    >
      <use :xlink:href="'#' + iconId" />
      <slot />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    iconId: {
      type: String,
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
    tooltipText() {
      const featuresDesc = {
        'coating-ng': 'Покрытие: nACo-G',
        'coating-tan': 'Покрытие: TiAlN',
        'coating-tin': 'Покрытие: TiN',
        'coating-pp': 'PurePolish. Полировка',
        'tail-cylinder': 'Цилиндрический хвостовик',
        'form-sharp': 'Торец без фаски, наостро',
        'form-sharp-r': 'Торец с притуплением',
        'form-sharp-f': 'Торец с фаской chх45˚',
        'form-radius': 'Радиусной торец',
        'form-sphere': 'Сферический торец',
        'cutting-conus': 'Режущая часть — конус',
        'cutting-inner-radius': 'Режущая часть с внутренним радиусом',
        'cutting-t': 'Т-образная режущая часть',
        'cogs-angle': 'Угол подъема спиральной канавки'
      }
      
      return featuresDesc[this.iconId]
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
