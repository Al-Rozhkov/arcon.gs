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
      const featuresDesc = this.$context.locale === 'ru-ru'
      ? {
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
        'cutting-arrow': 'Режущая часть — конус и цилиндр',
        'cutting-inner-radius': 'Режущая часть с внутренним радиусом',
        'cutting-t': 'Т-образная режущая часть',
        'cogs-angle': 'Угол подъема спиральной канавки',
        'cutting-fluid-in': 'Внутренний подвод СОЖ',
        'cutting-fluid-out': 'Внешний подвод СОЖ',
        'allowance-cutting-diameter': 'Допуск на диаметр режущей части',
        'tool-length': 'Длина',
      }
      : {
        'coating-ng': 'Coating: nACo-G',
        'coating-tan': 'Coating: TiAlN',
        'coating-tin': 'Coating: TiN',
        'coating-pp': 'PurePolish',
        'tail-cylinder': 'Cylindrical shank',
        'form-rect-sharp': 'Chamfered end face, on the sharp',
        'form-rect-r': 'Blunted end',
        'form-rect-f': 'Chamfered end chх45˚',
        'form-radius': 'Radius edge',
        'form-sphere': 'Spherical face',
        'cutting-conus': 'Cutting part - cone',
        'cutting-arrow': 'Cutting part - cone and cylinder',
        'cutting-inner-radius': 'Cutting part with inner radius',
        'cutting-t': 'T-shaped cutting part',
        'cogs-angle': 'Angle of lift of the spiral groove',
        'cutting-fluid-in': 'Internal coolant supply',
        'cutting-fluid-out': 'External coolant supply',
        'allowance-cutting-diameter': 'Cutter diameter tolerance',
        'tool-length': 'Length',
      }

      return featuresDesc[this.iconId]
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/svg-icon.scss';
</style>
