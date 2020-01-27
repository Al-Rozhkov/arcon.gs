<template>
  <page-layout>
    <main class="cnt">
      <h1>Рекомендации по&nbsp;выбору концевых фрез</h1>

      <grouped-overview :filters="true" :groups="groups" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductEndMill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        photos (width: 260, quality: 75)
        fusion
        mainUsage
        possibleUsage
        endShapes
        cuttingPartLength
        cogs {
          cogsPitch
          cogsNumber
          noCuttingCenter
        }
        grooveInclination {
          type
          angles
        }
        coating
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

  data() {
    return {
      filters: [],
      groups: [
        {
          name: 'short',
          label: 'Короткая режущая часть'
        },
        {
          name: 'middle',
          label: 'Средняя режущая часть'
        },
        {
          name: 'long',
          label: 'Длинная режущая часть'
        }
      ]
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору концевых фрез для металлобработки'
  }
}
</script>
