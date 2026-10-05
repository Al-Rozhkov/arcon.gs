<template>
  <ul class="menu" :id="navId">
    <li>
      <g-link :to="toSeries" exact class="menu-link">
        <span class="menu-link__dashed">Все инструменты серии</span>
      </g-link>
    </li>
    <li v-if="node.hasCuttingModes">
      <g-link :to="toModes" class="menu-link">
        <span class="menu-link__dashed">Режимы резания</span>
      </g-link>
    </li>
    <li v-if="node.hasCuttingModes">
      <g-link :to="toCalculator" class="menu-link">
        <span class="menu-link__dashed">Калькулятор режимов резания</span>
      </g-link>
    </li>
    <!-- <li class="menu-link" @click="switchPage()">
        <span class="menu-link__dashed">Произвольный инструмент</span>
      </li> -->
  </ul>
</template>

<script>
export default {
  props: {
    /** Серия: идентификатор для адресов и признак наличия режимов резания. */
    node: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      navId: 'page-tabs',
    }
  },
  computed: {
    /**
     * Адрес серии: `/catalog/<section>/<id>`. Раздел каталога берётся из текущего
     * адреса, поэтому вкладки одинаково работают для концевых фрез, сверл и
     * резьбовых фрез.
     */
    seriesBase() {
      const segments = this.$route.path.split('/').filter(Boolean)

      // На странице серии последний сегмент — сама серия, на страницах режимов
      // резания — «modes» или «calculator», его надо отбросить.
      if (segments[segments.length - 1] !== this.node.id) {
        segments.pop()
      }

      return '/' + segments.join('/')
    },

    toSeries() {
      return `${this.seriesBase}/`
    },

    toModes() {
      return `${this.seriesBase}/modes/#${this.navId}`
    },

    toCalculator() {
      return `${this.seriesBase}/calculator/#${this.navId}`
    },
  },
}
</script>
