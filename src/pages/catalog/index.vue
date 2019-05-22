<template>
  <page-layout>
        
    <main class="block">
      <h1>Рекомендации по&nbsp;выбору концевых фрез для металлобработки</h1>

      <table class="series-overview">
        <thead>
        </thead>
        <tbody>
          <template v-for="edge in filteredNodes">
            <series-item
              :node="edge.node"
              :key="edge.node.slug"
            />
          </template>
        </tbody>
      </table>
    </main>

  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductEndMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        productImg (width: 260, quality: 75)
        fusion
        mainUsage
        possibleUsage
        cuttingPart
        cogs {
          cogsPitch
          cogsNumber
        }
        grooveInclination {
          type
          angles
        }
        coating
      }
    }
  }
}
</page-query>


<script>
import PageLayout from '~/layouts/Catalog.vue'

import CatalogCategories from '~/components/catalog/CatalogCategories'
import SeriesItem from '~/components/catalog/SeriesTableItem'

export default {
  components: {
    PageLayout,
    CatalogCategories,
    SeriesItem
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
        return node
      })
    },

    seriesUsage() {
      return []
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору концевых фрез для металлобработки'
  }
}
</script>

<style lang="scss">
.series-overview {
  tr {
    border-top: 1px solid rgba(0,0,0,.1);
    padding: .5rem 0;
    margin: 0 -.5rem
  }

  td {
    padding: 0 .5rem;
  }
}
</style>
