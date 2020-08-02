<template>
  <page-layout>
    <main class="cnt">
      <h1>Спиральные и центровочные сверла</h1>

      <grouped-overview :nodes="$page.series.edges" :filters="filters" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductDrill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        body
        photos (width: 260, quality: 80)
        toolLength
        mainUsage
        possibleUsage
        cuttingPartLength
        cogs {
          cogsPitch
          cogsNumber
          noCuttingCenter
        }
        grooveInclination
        allowanceCuttingDiameter
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
    GroupedOverview,
  },

  data() {
    return {
      filters: {
        toolLength: {
          name: 'Длина',
          list: [
            {
              text: 'любая',
              value: null,
            },
            {
              text: '3xD',
              value: '3xD',
            },
            {
              text: '5xD',
              value: '5xD',
            },
            {
              text: '8xD',
              value: '8xD',
            },
          ],
        },
        mainUsage: true,
        coating: {
          name: 'Покрытие',
          list: [
            {
              text: 'любое',
              value: null,
            },
            {
              text: 'nACo-G',
              value: 'ng',
            },
            {
              text: 'TiAlN',
              value: 'tan',
            },
            {
              text: 'PurePolish (полировка)',
              value: 'pp',
            },
          ],
        },
        cuttingFluid: {
          name: 'Подвод СОЖ',
          list: [
            {
              text: 'не важно',
              value: null,
            },
            {
              text: 'внутренний',
              value: 'in',
            },
            {
              text: 'внешний',
              value: 'out',
            },
            // {
            //   text: 'без СОЖ',
            //   value: 'none',
            // },
          ],
        },
      },
    }
  },

  metaInfo: {
    title: 'Спиральные и центровочные сверла',
  },
}
</script>
