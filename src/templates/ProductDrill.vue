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
  query Drill ($path: String, $id: String!) {
    series: productDrill (path: $path) {
      id
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
      sharpeningAngle
      allowanceCuttingDiameter
      cuttingFluid
      cogs {
        cogsPitch
        cogsNumber
        noCuttingCenter
      }
      grooveInclination
      productSeriesSet {
        set
      }
    }
    tools: allProductItemDrill (
      filter: { series: { eq: $id } },
      sortBy: "id", order: ASC
    ) {
      edges {
        node {
          id
          series
          name
          a
          d1
          d2
          l1
          l2
          ap
          form
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
      title: `Сверло ${this.$page.series.id.toUpperCase()}`,
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
