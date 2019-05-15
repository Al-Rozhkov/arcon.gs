<template>
  <page-layout>

    <main class="block">
      <series-header :node="$page.tool" />

      <!-- <div v-if="toolExpanded" class="series-details">
        <div v-for="(scheme, index) in node.scheme" :key="index" class="series-scheme">
          <img :src="'/img/scheme/' + scheme + '.svg'">
        </div>

        <p class="small">
          Единицы измерения — мм
        </p>
        <table class="d-table">
          <thead class="table-thead">
            <tr>
              <td
                v-for="(col, index) in node.headers"
                :key="index"
                class="table-thead-col"
                :class="index"
                v-html="col"
              />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in node.params" :key="index" class="table-row">
              <td v-for="(col, i) in row" :key="i" class="table-col" :class="i">
                <span v-if="i === 'serial'" class="hd">
                  {{ node.code }}
                </span>
                <span class="td">{{ col }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->

      <section class="section-top">
        <h2>Похожие инструменты</h2>
      </section>
    </main>

  </page-layout>
</template>

<page-query>
  query Tool ($path: String) {
    tool: productEndMill (path: $path) {
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
  }
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'

import SeriesHeader from '~/components/catalog/SeriesHeader.vue'

export default {
  components: {
    PageLayout,
    SeriesHeader
  },

  /* metaInfo () {
    return {
      title: this.$page.category.title
    }
  } */
}
</script>

<style lang="scss">

</style>
