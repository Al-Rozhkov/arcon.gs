<template>
  <page-layout>
    <main class="cnt">
      <h1>Концевые и специальные фрезы</h1>

      <grouped-overview :nodes="$page.series.edges" :filters="filters" groupBy="type" />
    </main>
  </page-layout>
</template>

<page-query>
query Catalog {
  series: allProductEndMill(sortBy: "id", order: ASC, perPage: 200) {
    edges {
      node {
        id
        path
        type
        body
        photos (width: 260, quality: 80)
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
        grooveInclination
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
        endShapes: {
          name: 'Форма торца',
          list: [
            {
              text: 'любая',
              value: null,
            },
            {
              text: 'прямоугольная',
              value: ['rect-sharp', 'rect-r', 'rect-f'],
            },
            {
              text: 'радиусная',
              value: 'radius',
            },
            {
              text: 'сферическая',
              value: 'sphere',
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
        cuttingPartLength: {
          name: 'Длина режущей части',
          list: [
            {
              text: 'любая',
              value: null,
            },
            {
              text: 'короткая',
              value: 'short',
            },
            {
              text: 'средняя',
              value: 'middle',
            },
            {
              text: 'длинная',
              value: 'long',
            },
          ],
        },
      },
    }
  },

  metaInfo: {
    title: 'Концевые и специальные фрезы для металлобработки',
  },
}
</script>
