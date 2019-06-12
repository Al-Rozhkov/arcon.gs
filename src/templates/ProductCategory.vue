<template>
  <page-layout>

    <main class="block">
      <h1>{{ $page.category.title }}</h1>
      <categories-list class="submenu" />

      <div class="catalog-list">
        <series-teaser
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
                cogsCenter
              }
              grooveInclination {
                type
                angles
              }
              photos
            }
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

  metaInfo () {
    return {
      title: this.$page.category.title
    }
  }
}
</script>

<style lang="scss">

</style>
