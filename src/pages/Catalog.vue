<template>
  <Layout>
    <h1>Каталог режущего инструмента Arconit</h1>

    <catalog-block />

    <ul>
      <li v-for="edge in $page.series.edges" :key="edge.node.slug">
        <g-link :to="edge.node.path">{{ edge.node.series }}</g-link> {{ edge.node.coating }} 
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Catalog {
  series: allProductSeries(sortBy: "series", order: ASC, perPage: 100) {
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
import CatalogBlock from "~/components/catalog/CatalogBlock"

export default {
  components: {
    CatalogBlock
  },

  computed: {
    groupedSeries() {

    }
  },

  metaInfo: {
    title: 'Каталог режущего инструмента Arconit (Арконит)'
  }
}
</script>
