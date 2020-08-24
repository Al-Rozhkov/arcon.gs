<template>
  <div v-tooltip="tooltipText" class="icon-attr">
    <svg :width="width" :height="height" role="img">
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
      required: true,
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
    tooltipText() {
      const featuresDesc = {
        'coating-ng': 'Покрытие: nACo-G',
        'coating-tan': 'Покрытие: TiAlN',
        'coating-tin': 'Покрытие: TiN',
        'coating-pp': 'PurePolish. Полировка',
        'tail-cylinder': 'Цилиндрический хвостовик',
        'form-rect-sharp': 'Торец без фаски, наостро',
        'form-rect-r': 'Торец с притуплением',
        'form-rect-f': 'Торец с фаской chх45˚',
        'form-radius': 'Радиусной торец',
        'form-sphere': 'Сферический торец',
        'cutting-conus': 'Режущая часть — конус',
        'cutting-arrow': 'Режущая часть — конус',
        'cutting-inner-radius': 'Режущая часть с внутренним радиусом',
        'cutting-t': 'Т-образная режущая часть',
        'cogs-angle': 'Угол подъема спиральной канавки',
        'cutting-fluid-in': 'Внутренний подвод СОЖ',
        'cutting-fluid-out': 'Внешний подвод СОЖ',
        'allowance-cutting-diameter': 'Допуск на диаметр режущей части',
        'tool-length': 'Длина',
      }

      return featuresDesc[this.iconId]
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/svg-icon.scss';
</style>
