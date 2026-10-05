<template>
  <page-layout>
    <main class="container">
      <series-modes-page :series="$page.series" :modes="$page.modes.edges">
        <series-cutting-modes-tables :modes="$page.modes.edges" />
      </series-modes-page>
    </main>
  </page-layout>
</template>

<page-query>
query Drill($path: String, $cuttingModesSeries: String) {
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
import SeriesCuttingModesTables from '~/components/catalog/SeriesCuttingModesTables.vue'

export default {
  components: {
    PageLayout,
    SeriesModesPage,
    SeriesCuttingModesTables,
  },
}
</script>
