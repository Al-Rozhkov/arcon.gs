<template>
  <page-layout>
    <main class="container">
      <series-modes-page
        :series="$page.series"
        :tools="$page.tools.edges"
        :modes="$page.modes.edges"
        tables
      />
    </main>
  </page-layout>
</template>

<page-query>
query Drill($path: String, $id: String!, $cuttingModesSeries: String) {
  series: productDrill(path: $path) {
    title
    keywords
    id
    photos(width: 800, quality: 75)
    content
    scheme {
      name
      scheme
    }
    mainUsage {
      id
      text
    }
    possibleUsage {
      id
      text
    }
    coating {
      text
    }
    tail
    sharpeningAngle
    allowanceCuttingDiameter
    coolantSupply {
      id
      text
    }
    cogsPitch
    cogsNumber
    cogsCuttingCenter
    grooveInclination
    productSeriesSet {
      set
    }
    hasCuttingModes
  }
  tools: allProductItemDrill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        d1
      }
    }
  }
  modes: allCuttingMode(
    filter: { series: { eq: $cuttingModesSeries } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        type
        material
        kap
        kae
        nodes {
          d
          n
          fv
          fn
          ap
          ae
        }
      }
    }
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesModesPage from '~/components/catalog/SeriesModesPage.vue'

export default {
  components: {
    PageLayout,
    SeriesModesPage,
  },
}
</script>
