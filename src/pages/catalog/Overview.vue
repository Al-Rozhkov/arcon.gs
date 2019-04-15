<template>
  <Layout>
    <main class="block">
      <h1>Рекомендации по&nbsp;выбору концевых фрез для металлобработки</h1>

      <categories-list />

      <table>
        <thead>
        </thead>
        <tbody>
          <tr
            v-for="edge in filteredNodes"
            :key="edge.node.slug"
          >
            <td>
              <h2>{{ edge.node.series.toUpperCase() }}</h2>
            </td>
            <td>
              {{ edge.node.myField }}
            </td>
            <td>
              <svg-icon
                :icon-id="'coating-' + edge.node.coating"
                :size="30"
              />
            </td>
            <td>
              <g-image
                v-if="edge.node.imgTeaser"
                :src="edge.node.imgTeaser"
              />
            </td>
          </tr>
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
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import SeriesImg from '~/components/catalog/SeriesImg'

export default {
  components: {
    CategoriesList,
    SvgSpriteFeatures,
    SvgIcon,
    SeriesImg
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
