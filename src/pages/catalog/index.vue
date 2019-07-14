<template>
  <page-layout>
    <main class="cnt">
      <h1>Рекомендации по&nbsp;выбору концевых фрез для металлобработки</h1>

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
        productImg (width: 260, quality: 75)
        fusion
        mainUsage
        possibleUsage
        endShapes
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

      /* [
        {
          label: '<h2>Цилиндрические фрезы</h2>'
        },
        {
          label: '<h3>Короткая режущая часть</h3>'
        },
        {
          name: 'cilinderShortLength',
          condition: [
            {
              trait: 'endShapes',
              value: ['sharp', 'sharp-r', 'sharp-f']
            },
            {
              trait: 'cuttingPartLength',
              value: 'short'
            }
          ]
        },
        {
          name: 'cilinderMiddleLength',
          condition: [
            {
              trait: 'endShapes',
              value: ['sharp', 'sharp-r', 'sharp-f']
            },
            {
              trait: 'cuttingPartLength',
              value: 'middle'
            }
          ]
        },
        {
          name: 'cilinderLongLength',
          condition: [
            {
              trait: 'endShapes',
              value: ['sharp', 'sharp-r', 'sharp-f']
            },
            {
              trait: 'cuttingPartLength',
              value: 'long'
            }
          ]
        },
        {
          html: '<h2>Радиусные фрезы</h2>'
        },
        {
          name: 'radius',
          condition: [
            {
              trait: 'endShapes',
              value: 'radius'
            }
          ]
        },
        {
          html: '<h2>Радиусные фрезы</h2>'
        },
        {
          name: 'sphere',
          condition: [
            {
              trait: 'endShapes',
              value: 'sphere'
            }
          ]
        }
      ] */
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору концевых фрез для металлобработки'
  }
}
</script>

