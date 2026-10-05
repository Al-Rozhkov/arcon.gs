<template>
  <div>
    <series-page-header :node="series" />

    <series-page-tabs :node="series" class="mb-2" />

    <slot v-if="hasModes" />

    <div v-else class="mb-4">
      Для получения режимов резания этого инструмента свяжитесь с нашими представителями.
    </div>
  </div>
</template>

<script>
/**
 * Общая рамка страниц режимов резания серии: шапка, вкладки и запасной текст
 * для серии без режимов. Содержимое страницы — в слоте, поэтому таблицы режимов
 * и калькулятор живут на разных адресах и не зависят друг от друга.
 */
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTabs from '~/components/catalog/SeriesPageTabs.vue'

export default {
  components: {
    SeriesPageHeader,
    SeriesPageTabs,
  },

  props: {
    series: {
      type: Object,
      required: true,
    },
    /** Режимы резания серии, `edges` запроса: только ради проверки, что они есть. */
    modes: {
      type: Array,
      required: true,
    },
    /** Заголовок документа; по умолчанию — название серии. */
    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    hasModes() {
      return this.modes.length > 0
    },
  },

  metaInfo() {
    const title = this.title || this.series.title

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
