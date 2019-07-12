<template>
  <page-layout>

    <main class="cnt">
      <h1>Рекомендации по&nbsp;выбору сверл</h1>

      <table class="series-overview sticky-header">
        <thead>
          <tr>
            <th>Серия</th>
            <th></th>
            <th>Основное применение</th>
            <th>Возможное применение</th>
            <th>Зубья</th>
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
  series: allProductDrill(sortBy: "id", order: ASC, perPage: 125) {
    edges {
      node {
        id
        path
        productImg (width: 260, quality: 75)
        mainUsage
        possibleUsage
        cuttingPart
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
import SeriesItem from '~/components/catalog/SeriesTableItem.vue'

export default {
  components: {
    PageLayout,
    SeriesItem
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

  computed: {
    groupedNodes() {
      const all = this.$page.series.edges

      const groups = {}
      for (let i = 0, len = all.length; i < len; i++) {
        all[i].node.cuttingPart.forEach(element => {
          (groups[element] = groups[element] || []).push(i)
        })
      }

      return groups
    }
  },

  metaInfo: {
    title: 'Рекомендации по выбору сверл'
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/modules/table.scss';
</style>
