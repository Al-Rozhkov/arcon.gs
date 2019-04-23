<template>
  <Layout>
    <section class="container-xl">
      <categories-list class="catalog-submenu" />
    </section>

    <main class="block">
      <h2>{{ $page.category.title }}</h2>

      <div
        v-for="edge in $page.category.belongsTo.edges"
        :key="edge.node.id"
      >
        <series-item :node="edge.node" />
      </div>

      <svg-sprite-features style="display: none;" />
    </main>
  </Layout>
</template>

<page-query>
  query Category ($path: String) {
    category: productCategory (path: $path) {
      title,
      belongsTo (sortBy: "series", order: ASC) {
        edges {
          node {
            ...on ProductSeries {
              id
              series
              fusion
              imgTeaser (width: 300, quality: 75)
              body
              material
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
              photos
            }
          }
        }
      }
    }
  }
</page-query>

<script>
import CategoriesList from "~/components/catalog/CategoriesList"
import SeriesItem from '~/components/catalog/SeriesTeaser'
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'

export default {
  components: {
    CategoriesList,
    SeriesItem,
    SvgSpriteFeatures
  },

  metaInfo () {
    return {
      title: this.$page.category.title
    }
  }
}
</script>
