<template>
  <Layout>
    <main class="block">
      <h1>Каталог режущего инструмента Arconit</h1>

      <categories-list />

      <ul>
        <li v-for="edge in $page.series.edges" :key="edge.node.slug">
          <series-teaser :node="edge.node" />
        </li>
      </ul>
    </main>
  </Layout>
</template>

<page-query>
query Catalog {
  series: allProductSeries(sortBy: "series", order: ASC, perPage: 125) {
    edges {
      node {
        series
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
        photos
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
import SeriesTeaser from '~/components/catalog/SeriesTeaser'

export default {
  components: {
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
    title: 'Каталог режущего инструмента Arconit (Арконит)'
  }
}
</script>
