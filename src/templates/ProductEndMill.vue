<template>
  <page-layout>
    <main class="cnt">
      <series-page :node="$page.series" :tools="$page.tools" />

      <!-- <section class="pt">
        <h2>Похожие инструменты</h2>
      </section>-->
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
      mainUsage
      possibleUsage
      coating
      tail
      endShapes
      cuttingShapes
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
    return {
      title: `Концевая фреза ${this.$page.series.id.toUpperCase()}`,
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
      ],
    }
  },
}
</script>
