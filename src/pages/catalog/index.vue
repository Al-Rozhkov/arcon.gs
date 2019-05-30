<template>
  <page-layout>
        
    <main class="block">
      <h1>Рекомендации по&nbsp;выбору концевых фрез для металлобработки</h1>

      <table class="series-overview sticky-header">
        <thead>
          <tr>
            <th>Серия</th>
            <th></th>
            <th>Основное применение</th>
            <th>Возможное применение</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in groups">
            <tr :key="`tr-${group.name}`">
              <td colspan="5" class="series-cutting-group">{{ group.label }}</td>
            </tr>
            <series-item
              v-for="nodeIndex in groupedNodes[group.name]"
              :node="$page.series.edges[nodeIndex].node"
              :key="`${group.name}-${nodeIndex}`"
            />
          </template>
        </tbody>
      </table>
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
        cuttingPart
        cogs {
          cogsPitch
          cogsNumber
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

import CatalogCategories from '~/components/catalog/CatalogCategories'
import SeriesItem from '~/components/catalog/SeriesTableItem'

export default {
  components: {
    PageLayout,
    CatalogCategories,
    SeriesItem
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

  computed: {
    groupedNodes() {
      const all = this.$page.series.edges

      const groups = {}
      for (let i = 0, len = all.length; i < len; i++) {
        // groups[all[i].cuttingPart].items
        all[i].node.cuttingPart.forEach(element => {
          (groups[element] = groups[element] || []).push(i)
        })
      }

      return groups
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору концевых фрез для металлобработки'
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/table.scss';

.series-overview {
  margin: 0 -.5rem;

  h2 {
    font-size: 1.5rem;
  }

  td {
    border-top: 1px solid rgba(0,0,0,.1);
    padding: .3rem .5rem;
  }

  td.series-cutting-group {
    padding-top: 1.75rem;
  }
}
</style>
