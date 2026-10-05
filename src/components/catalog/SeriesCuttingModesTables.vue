<template>
  <div>
    <template v-if="modesByType.none.length">
      <h2 class="mb-2">Режимы обработки</h2>
      <series-cutting-modes :items="modesByType.none" />
    </template>

    <template v-if="modesByType.ledge.length">
      <div class="flex-row-nowrap gap-2 mb-2">
        <icon-mode-ledge class="cutting-modes-icon" />
        <h2 class="mb-0">Режимы обработки уступа</h2>
      </div>
      <series-cutting-modes :items="modesByType.ledge" />
    </template>

    <template v-if="modesByType.groove.length">
      <div class="flex-row-nowrap gap-2 mb-2">
        <icon-mode-groove class="cutting-modes-icon" />
        <h2 class="mb-0">Режимы обработки паза</h2>
      </div>
      <series-cutting-modes :items="modesByType.groove" />
    </template>

    <div
      v-if="comment"
      class="alert alert-warning mb-4"
      v-html="comment"
    ></div>
  </div>
</template>

<script>
/**
 * Таблицы режимов резания серии: содержимое страницы «Режимы резания».
 *
 * Общая для всех типов инструментов: у концевых фрез есть типы обработки
 * «в уступ» и «в паз», у сверл и резьбовых фрез тип один — общие режимы
 * резания. Калькулятора здесь нет: он живёт на своей странице.
 */
import SeriesCuttingModes from '~/components/catalog/SeriesCuttingModes.vue'
import IconModeLedge from '~/components/icons/IconModeLedge.vue'
import IconModeGroove from '~/components/icons/IconModeGroove.vue'

export default {
  components: {
    SeriesCuttingModes,
    IconModeLedge,
    IconModeGroove,
  },

  props: {
    /** Режимы резания серии, `edges` запроса. */
    modes: {
      type: Array,
      required: true,
    },
    /** Примечание серии к режимам резания, HTML из описания. */
    comment: {
      type: String,
      default: '',
    },
  },

  computed: {
    /** Группы режимов, разложенные по типам обработки. */
    modesByType() {
      const result = {
        none: [],
        ledge: [],
        groove: [],
      }

      for (const { node } of this.modes) {
        if (!node.type) {
          result.none.push(node)
        }
        if (node.type === 'ledge') {
          result.ledge.push(node)
        }
        if (node.type === 'groove') {
          result.groove.push(node)
        }
      }

      return result
    },
  },
}
</script>

<style lang="scss">
.cutting-modes-icon {
  max-width: 80px;
  margin-top: -0.5rem;
}
</style>
