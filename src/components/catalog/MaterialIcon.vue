<template>
  <span
    v-tooltip="matDesc"
    :class="matClass"
  >
    {{ matId }}
  </span>
</template>

<script>
export default {
  props: {
    matId: {
      type: String,
      required: true
    },
    matMain: {
      type: Boolean,
      default: true
    },
    showTooltip: {
      type: Boolean,
      default: true
    }
  },

  data: () => {
    return {
      materialDesc: {
        'p': 'Углеродистая и легированная сталь',
        'k': 'Чугун',
        'm': 'Нержавеющая сталь',
        'h': 'Закаленная сталь',
        'h1.1': 'Закаленная сталь',
        'h1.2': 'Закаленная сталь',
        'n': 'Цветные металлы',
        'n1': 'Сплавы на основе алюминия',
        'n3': 'Сплавы на основе меди',
        's': 'Суперсплавы и титан (жаропрочные сплавы)'
      }
    }
  },

  computed: {
    matDesc() {
      return (this.showTooltip) ? this.materialDesc[this.matId] : false
    },
    matClass() {
      const usageType = this.matMain ? 'mat-main' : 'mat-possible'
      return usageType + ' mat-' + this.matId.replace('.', '-')
    }
  }
}
</script>
