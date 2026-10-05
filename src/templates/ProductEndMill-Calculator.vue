<template>
  <page-layout>
    <main class="container">
      <series-modes-page
        :series="$page.series"
        :tools="$page.tools.edges"
        :modes="$page.modes.edges"
      />
    </main>
  </page-layout>
</template>

<page-query>
query EndMill($path: String, $id: String!, $cuttingModesSeries: String) {
  series: productEndMill(path: $path) {
    title
    keywords
    id
    fusion
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
    endShapes {
      id
      text
    }
    cuttingShapes {
      id
      text
    }
    cogsPitch
    cogsNumber
    cogsCuttingCenter
    grooveInclination
    allowanceRadius
    allowanceCuttingDiameter
    productSeriesSet {
      set
    }
    hasCuttingModes
  }
  tools: allProductItemEndMill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        d1
        z
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