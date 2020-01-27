<template>
  <page-layout>

    <main class="cnt">
      <h1>Рекомендации по&nbsp;выбору сверл</h1>

      <grouped-overview :groups="groups" />
    </main>

  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductDrill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        photos (width: 260, quality: 75)
        mainUsage
        possibleUsage
        cuttingPartLength
        cogs {
          cogsPitch
          cogsNumber
          cogsCenter
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
          name: 'middle',
          label: 'Средняя серия'
        },
        {
          name: 'long',
          label: 'Длинная серия'
        }
      ]
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору сверл'
  }
}
</script>
