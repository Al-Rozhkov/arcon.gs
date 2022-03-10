<template>
  <page-layout>
    <main class="container">
      <h1>{{ $page.title.value }}</h1>

      <grouped-overview
        :nodes="$page.series.edges"
        :filters="filters"
        groupBy="type"
      />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  title: t(id: "headline.catalog.end-mills") {
    value
  }
  series: allProductEndMill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        content
        photos(width: 260, quality: 80)
        fusion
        mainUsage {
          id
          text
        }
        possibleUsage {
          id
          text
        }
        endShapes {
          id
        }
        tail
        cuttingEdgeLength
        cuttingShapes {
          id
          text
        }
        cogsPitch
        cogsNumber
        cogsCuttingCenter
        grooveInclination
        coating {
          id
          text
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
        endShapes: true,
        mainUsage: true,
        coating: true,
        cuttingEdgeLength: true,
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
