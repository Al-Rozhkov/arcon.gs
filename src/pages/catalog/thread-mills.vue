<template>
  <page-layout>
    <main class="cnt">
      <h1>Резьбовые фрезы Arconit™</h1>

      <grouped-overview :nodes="$page.series.edges" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductThreadMill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        body
        photos (width: 260, quality: 80)
        body
        mainUsage
        possibleUsage
        coating
        tail
        cuttingShapes
        cuttingFluid
      }
    }
  }
}
</page-query>


<script>
import PageLayout from '~/layouts/Catalog.vue'
import GroupedOverview from '~/components/catalog/GroupedOverview.vue'

export default {
  components: {
    PageLayout,
    GroupedOverview
  },

  metaInfo: {
    title: 'Резьбовые фрезы Arconit (Арконит)'
  }
}
</script>
