<template>
  <page-layout>

    <main class="cnt">
      <h1>Резьбовые фрезы Arconit™</h1>

      <div class="catalog-list">
        <series-teaser
          v-for="edge in $page.series.edges"
          :key="edge.node.id"
          :node="edge.node"
        />
      </div>
    </main>

  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductThreadMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        productImg (width: 300, quality: 75)
        body
        mainUsage
        coating
        tail
        cuttingShapes
      }
    }
  }
}
</page-query>


<script>
import PageLayout from '~/layouts/Catalog.vue'

import SeriesTeaser from '~/components/catalog/SeriesTeaser'

export default {
  components: {
    PageLayout,
    SeriesTeaser
  },

  data() {
    return {
      filters: []
    }
  },

  computed: {
    filteredNodes() {
      const result = this.$page.series.edges
      return result.filter(node => {

      })
    }
  },

  metaInfo: {
    title: 'Резьбовые фрезы Arconit (Арконит)'
  }
}
</script>
