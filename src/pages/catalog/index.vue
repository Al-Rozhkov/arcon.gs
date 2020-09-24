<template>
  <page-layout>
    <main class="cnt">
      <h1>Онлайн-каталог режущего инструмента</h1>

      <grouped-overview :nodes="series" groupBy="type" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  drills: allProductDrill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        type
        photos (width: 260, quality: 75)
        body
        mainUsage
        possibleUsage
        cuttingPartLength
        cogsPitch
        cogsNumber
        cogsCuttingCenter
        grooveInclination
        coating
        toolLength
        allowanceCuttingDiameter
      }
    }
  }
  endMills: allProductEndMill(sortBy: "id", order: ASC, perPage: 1000) {
    edges {
      node {
        id
        path
        type
        photos (width: 260, quality: 75)
        body
        fusion
        mainUsage
        possibleUsage
        endShapes
        cuttingShapes
        cuttingPartLength
        cogsPitch
        cogsNumber
        cogsCuttingCenter
        grooveInclination
        coating
      }
    }
  }
  threadMills: allProductThreadMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        type
        photos (width: 300, quality: 75)
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

  metaInfo: {
    title: 'Онлайн-каталог режущего инструмента',
  },
}
</script>

