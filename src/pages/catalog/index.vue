<template>
  <page-layout svg-sprites>
    <main class="container">
      <h1>{{ $page.title.value }}</h1>

      <grouped-overview :nodes="series" groupBy="type" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  title: t(id: "headline.catalog.title") {
    value
  }
  drills: allProductDrill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        type
        photos(width: 260, quality: 75)
        content
        mainUsage {
          id
          text
        }
        possibleUsage {
          id
          text
        }
        cuttingEdgeLength
        cogsPitch
        cogsNumber
        cogsCuttingCenter
        grooveInclination
        coating {
          id
          text
        }
        toolLength
        allowanceCuttingDiameter
        coolantSupply {
          id
        }
      }
    }
  }
  endMills: allProductEndMill(sortBy: "id", order: ASC, perPage: 1000) {
    edges {
      node {
        id
        path
        type
        photos(width: 260, quality: 75)
        content
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
        cuttingShapes {
          id
        }
        cuttingEdgeLength
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
  threadMills: allProductThreadMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        type
        photos(width: 300, quality: 75)
        content
        mainUsage {
          id
          text
        }
        possibleUsage {
          id
          text
        }
        coating {
          id
          text
        }
        tail
        cuttingShapes {
          id
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
    series() {
      return [
        ...this.$page.drills.edges,
        ...this.$page.endMills.edges,
        ...this.$page.threadMills.edges,
      ]
    },
  },

  metaInfo() {
    return {
      title: this.$page.title.value,
    }
  },
}
</script>

