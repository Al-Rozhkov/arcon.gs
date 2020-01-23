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
query Tool ($path: String, $id: String!) {
  series: productThreadMill (path: $path) {
    id
    productImg (width: 800, quality: 75)
    body
    scheme {
      name
      scheme
    }
    mainUsage
    coating
    tail
    cuttingShapes
    photos,
    productSeriesSet {
      set
    }
  }
  tools: allProductItemThreadMill (
    filter: { series: { eq: $id } },
    sortBy: "id", order: ASC
  ) {
    edges {
      node {
        id
        series
        name
        step
        thread
        d1
        d2
        l1
        l2
        z
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
    SeriesPage
  },

  metaInfo() {
    return {
      title: `Резьбовая фреза ${this.$page.series.id}`,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.series.body
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: this.$page.tools.edges.map(t => t.node.id).join(', ')
        }
      ]
    }
  }
}
</script>
