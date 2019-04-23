<template>
  <Layout>
    <main class="block">
      <h1>Рекомендации по&nbsp;выбору концевых фрез для металлобработки</h1>

      <!-- <categories-list class="catalog-submenu" /> -->

      <table>
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

    <svg-sprite-features style="display: none;" />
  </Layout>
</template>

<page-query>
query Catalog {
  series: allProductSeries(sortBy: "series", order: ASC, perPage: 125) {
    edges {
      node {
        series
        imgTeaser (width: 300, quality: 75)
        fusion
        path
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
import SeriesItem from "~/components/catalog/SeriesTableItem"
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'
import SvgIcon from '~/components/catalog/SvgFeatureIcon'

export default {
  components: {
    CategoriesList,
    SeriesItem,
    SvgSpriteFeatures,
    SvgIcon
  },

  data() {
    return {
      filters: [],
      usageKeys: [
        'p', 'k', 'm', 'n1', 'n3', 's', 'h1.1', 'h1.2'
      ]
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
