<template>
  <page-layout>
    <main class="cnt">
      <h1>{{ $page.category.title }}</h1>
      <categories-list class="submenu" />

      <div class="catalog-list">
        <series-card
          v-for="edge in $page.category.belongsTo.edges"
          :key="edge.node.id"
          :node="edge.node"
        />
      </div>
    </main>
  </page-layout>
</template>

<page-query>
  query Category ($path: String) {
    category: productCategory (path: $path) {
      title,
      belongsTo (sortBy: "id", order: ASC) {
        edges {
          node {
            ...on ProductEndMill {
              id
              path
              fusion
              photos (width: 300, quality: 75)
              content
              mainUsage {
                id
                text
              }
              coating { text }
              tail
              endShapes { id text }
              cuttingShapes { id text }
              cogsPitch
              cogsNumber
              cogsCuttingCenter
              grooveInclination
            }
          }
        }
      }
    }
  }
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'

import CategoriesList from '~/components/catalog/CategoriesList'
import SeriesCard from '~/components/catalog/SeriesCard'

export default {
  components: {
    PageLayout,
    CategoriesList,
    SeriesCard,
  },

  metaInfo() {
    return {
      title: this.$page.category.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.category.title,
        },
      ],
    }
  },
}
</script>
