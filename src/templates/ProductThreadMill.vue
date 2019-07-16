<template>
  <page-layout>
    <main class="cnt">
      <series-header :node="$page.series" />

      <div class="flex-row">
        <div class="series-scheme">
          <img
            v-for="(scheme, id) in $page.series.scheme"
            :key="id"
            :src="'/img/schemes/' + scheme.scheme + '.png'"
          />
        </div>

        <product-items-table
          :fields-set="$page.series.productSeriesSet.set"
          :tools="$page.tools.edges"
        />
      </div>

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
          series {
            id
          }
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

import SeriesHeader from '~/components/catalog/SeriesHeader.vue'
import ProductItemsTable from '~/components/catalog/ProductItemsTable.vue'

export default {
  components: {
    PageLayout,
    SeriesHeader,
    ProductItemsTable
  },

  metaInfo() {
    return {
      title: `Резьбовая фреза ${this.$page.series.id}`
    }
  }
}
</script>

<style lang="scss">
</style>
