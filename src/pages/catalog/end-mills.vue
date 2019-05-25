<template>
  <page-layout>
    
    <main class="block">
      <h1>Концевые фрезы Arconit™</h1>
      <categories-list class="submenu" />

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
  series: allProductEndMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        fusion
        productImg (width: 300, quality: 75)
        body
        mainUsage
        coating
        tail
        endShapes
        cuttingShapes
        cogs {
          cogsPitch
          cogsNumber
        }
        grooveInclination {
          type
          angles
        }
      }
    }
  }
}
</page-query>


<script>
import PageLayout from '~/layouts/Catalog.vue'

import CategoriesList from "~/components/catalog/CategoriesList"
import SeriesTeaser from '~/components/catalog/SeriesTeaser'


export default {
  components: {
    PageLayout,
    CategoriesList,
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
    title: 'Концевые фрезы Arconit (Арконит)'
  }
}
</script>

<style lang="scss">

</style>
