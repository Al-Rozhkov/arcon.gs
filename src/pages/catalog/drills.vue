<template>
  <page-layout>
    <main class="container">
      <h1>{{ $page.title.value }}</h1>

      <grouped-overview :nodes="$page.series.edges" :filters="filters" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  title: t(id: "headline.catalog.drills") {
    value
  }
  series: allProductDrill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        content
        photos(width: 260, quality: 80)
        toolLength
        mainUsage {
          id
          text
        }
        possibleUsage {
          id
          text
        }
        tail
        cuttingEdgeLength
        cogsPitch
        cogsNumber
        cogsCuttingCenter
        grooveInclination
        allowanceCuttingDiameter
        coating {
          id
          text
        }
        coolantSupply {
          id
        }
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

  computed: {
    filters() {
      return {
        toolLength: true,
        mainUsage: true,
        coating: true,
        coolantSupply: true,
      }
    },
  },

  metaInfo() {
    return {
      title: this.$page.title.value,
    }
  },
}
</script>
