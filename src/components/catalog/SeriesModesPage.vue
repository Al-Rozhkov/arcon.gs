<template>
  <div>
    <series-page-header :node="series" />

    <series-page-tabs :node="series" class="mb-2" />

    <div v-if="hasModes">
      <template v-if="tables">
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
          v-if="series.modesComment"
          class="alert alert-warning mb-4"
          v-html="series.modesComment"
        ></div>
      </template>

      <h2 class="mb-2">Калькулятор режимов резания</h2>
      <series-page-modes-calculator :tools="tools" :modes="modes" />
    </div>

    <div v-else class="mb-4">
      Для получения режимов резания этого инструмента свяжитесь с нашими представителями.
    </div>
  </div>
</template>

<script>
/**
 * Страница режимов резания серии: таблицы режимов и калькулятор.
 *
 * Общая для всех типов инструментов: у концевых фрез есть типы обработки
 * «в уступ» и «в паз», у сверл и резьбовых фрез тип один — общие режимы
 * резания, а таблица инструментов серии может не содержать зубьев.
 */
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTabs from '~/components/catalog/SeriesPageTabs.vue'
import SeriesCuttingModes from '~/components/catalog/SeriesCuttingModes.vue'
import SeriesPageModesCalculator from '~/components/catalog/SeriesPageModesCalculator.vue'
import IconModeLedge from '~/components/icons/IconModeLedge.vue'
import IconModeGroove from '~/components/icons/IconModeGroove.vue'

export default {
  components: {
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesCuttingModes,
    SeriesPageModesCalculator,
    IconModeLedge,
    IconModeGroove,
  },

  props: {
    series: {
      type: Object,
      required: true,
    },
    /** Инструменты серии, `edges` запроса. */
    tools: {
      type: Array,
      required: true,
    },
    /** Режимы резания серии, `edges` запроса. */
    modes: {
      type: Array,
      required: true,
    },
    /** Показывать таблицы режимов, а не только калькулятор. */
    tables: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasModes() {
      return this.modes.length > 0
    },

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

  metaInfo() {
    const title = this.tables
      ? this.series.title
      : 'Калькулятор режимов резания ' + this.series.title

    return {
      title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.series.content,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: this.series.keywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.cutting-modes-icon {
  max-width: 80px;
  margin-top: -0.5rem;
}
</style>
