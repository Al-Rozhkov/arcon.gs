<template>
  <Layout>
    <section class="container-xl">
      <categories-list class="submenu" />
    </section>

    <main class="block">
      <h1>Каталог режущего инструмента Arconit</h1>

      <div class="catalog-list">
        <series-teaser
          v-for="edge in $page.series.edges"
          :key="edge.node.slug"
          :node="edge.node"
        />
      </div>
    </main>

    <svg-sprite-features style="display: none;" />
  </Layout>
</template>

<page-query>
query Catalog {
  series: allProductSeries(sortBy: "series", order: ASC, perPage: 125) {
    edges {
      node {
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
        usage {
          base
          possible
        }
      }
    }
  }
}
</page-query>


<script>
import CategoriesList from "~/components/catalog/CategoriesList"
import SeriesTeaser from '~/components/catalog/SeriesTeaser'
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'

export default {
  components: {
    CategoriesList,
    SeriesTeaser,
    SvgSpriteFeatures
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
    title: 'Каталог режущего инструмента Arconit (Арконит)'
  }
}
</script>

<style lang="scss">
.catalog-list {
  margin: 0 -15px;

  @include media-breakpoint-up(lg) {
    margin: 0 -30px;
  }
}
</style>
