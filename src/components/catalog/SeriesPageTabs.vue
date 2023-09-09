<template>
  <ul class="menu" :id="navId">
    <li>
      <g-link :to="toSeries" exact class="menu-link">
        <span class="menu-link__dashed">Все инструменты серии</span>
      </g-link>
    </li>
    <li>
      <g-link :to="toModes" class="menu-link">
        <span class="menu-link__dashed">Режимы резания</span>
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
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      navId: 'page-tabs',
    }
  },
  computed: {
    toSeries() {
      return `/catalog/end-mills/${this.id}/`
    },

    toModes() {
      return `/catalog/end-mills/${this.id}/modes/#${this.navId}`
    },
  },
}
</script>