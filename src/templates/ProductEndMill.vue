<template>
  <page-layout>
    <main class="block" ref="printTarget">
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

      <!-- <section class="section-top">
        <h2>Похожие инструменты</h2>
      </section>-->
    </main>
  </page-layout>
</template>

<page-query>
  query Tool ($path: String, $id: String!) {
    series: productEndMill (path: $path) {
      id
      fusion
      productImg (width: 800, quality: 75)
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
      cogs {
        cogsPitch
        cogsNumber
        cogsCenter
      }
      grooveInclination {
        type
        angles
      }
      photos,
      productSeriesSet {
        set
      }
    }
    tools: allProductItemEndMill (
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
      title: `Концевая фреза ${this.$page.series.id}`
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/series.scss';
</style>
