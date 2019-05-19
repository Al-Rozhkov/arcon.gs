<template>
  <page-layout>

    <main class="block">
      <series-header :node="$page.series" />

      <div class="product-items-list">
        <!-- <div v-for="(scheme, id) in $page.series" :key="id" class="series-scheme">
          <img :src="'/img/scheme/' + scheme + '.svg'">
        </div> -->

        <product-items-table :tools="$page.tools" />
      </div>

      <section class="section-top">
        <h2>Похожие инструменты</h2>
      </section>
    </main>

  </page-layout>
</template>

<page-query>
  query Tool ($path: String, $series: String!) {
    series: productEndMill (path: $path) {
      id
      series
      fusion
      productImg (width: 800, quality: 75)
      body
      mainUsage
      coating
      tail
      endShapes
      cuttingShapes
      cogs {
        cogsPitch
        cogsNumber
      }
      grooveInclination {
        type
        angles
      }
      photos
    }
    tools: allProductItemEndMill (filter: { series: { eq: $series } }) {
      edges {
        node {
          id
          d1
          d2
          d3
          r
          f45
          l1
          l2
          z
          form
        }
      }
    }
  }
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'

import SeriesHeader from '~/components/catalog/SeriesHeader.vue'
import ProductItemsTable from '~/components/catalog/ProductItemsTable.vue'

export default {
  components: {
    PageLayout,
    SeriesHeader,
    ProductItemsTable
  },

  metaInfo () {
    return {
      title: this.$page.series.id
    }
  }
}
</script>

<style lang="scss">

</style>
