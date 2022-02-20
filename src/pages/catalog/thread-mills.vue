<template>
  <page-layout>
    <main class="container">
      <h1>{{ $page.title.value }}</h1>

      <grouped-overview :nodes="$page.series.edges" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  title: t(id: "headline.catalog.thread-mills") {
    value
  }
  series: allProductThreadMill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        content
        photos (width: 260, quality: 80)
        mainUsage { id text }
        possibleUsage { id text }
        coating { id text }
        tail
        cuttingShapes { id text }
        coolantSupply { id }
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
    GroupedOverview,
  },

  metaInfo() {
    return {
      title: this.$page.title.value,
    }
  },
}
</script>
