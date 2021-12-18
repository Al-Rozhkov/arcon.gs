<template>
  <page-layout>
    <main class="cnt">
      <series-page :node="$page.series" :tools="$page.tools" />
    </main>
  </page-layout>
</template>

<page-query>
  query EndMill ($path: String, $id: String!) {
    series: productEndMill (path: $path) {
      id
      fusion
      photos (width: 800, quality: 75)
      body
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
      coating { text }
      tail
      endShapes { id text }
      cuttingShapes { id text }
      cogsPitch
      cogsNumber
      cogsCuttingCenter
      grooveInclination
      allowanceRadius
      allowanceCuttingDiameter
      productSeriesSet { set }
    }
    tools: allProductItemEndMill (
      filter: { series: { eq: $id } },
      sortBy: "id", order: ASC
    ) {
      edges {
        node {
          id
          series
          name
          d1
          d2
          d3
          r
          f45
          l1
          l2
          ap
          z
          form
          tip
        }
      }
    }
    cTool: t(id: "catalog.end-mill") {
      value
    }
  }
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPage from '~/components/catalog/SeriesPage.vue'

export default {
  components: {
    PageLayout,
    SeriesPage,
  },

  metaInfo() {
    const title = `${this.$page.cTool.value} ${this.$page.series.id.toUpperCase()}`
    
    return {
      title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.series.body,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: this.$page.tools.edges.map((t) => t.node.id).join(', '),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },
}
</script>
