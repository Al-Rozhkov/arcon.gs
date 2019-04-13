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
        'n': 'Цветные металлы',
        'n1': 'Сплавы на основе алюминия',
        's': 'Суперсплавы и титан (жаропрочные сплавы)'
      }
    }
  },

  computed: {
    matDesc() {
      return (this.showTooltip) ? this.materialDesc[this.matId] : false
    },
    matClass() {
      return 'icon-mat mat-' + this.matId.replace('.', '-')
    }
  }
}
</script>
