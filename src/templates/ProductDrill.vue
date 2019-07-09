<template>
  <page-layout>
    <main class="block">
      <series-header :node="$page.series" />

      <div class="product-items-list">
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
    series: productDrill (path: $path) {
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
    tools: allProductItemDrill (filter: { series: { eq: $id } }) {
      edges {
        node {
          id
          series {
            id
          }
          name
          a
          d1
          d2
          l1
          ap
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

  metaInfo() {
    return {
      title: `Сверло ${this.$page.series.id}`
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/series.scss';
</style>
