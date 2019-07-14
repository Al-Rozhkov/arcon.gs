<template>
  <table class="t sticky-header">
    <thead>
      <tr>
        <th>Серия</th>
        <th>Основное применение</th>
        <th>Возможное применение</th>
        <th colspan="3">Покрытие, зубья</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(group, gIndex) in groups">
        <tr :key="`tr-${gIndex}`">
          <td colspan="6" class="group-label">{{ group.label }}</td>
        </tr>
        <series-item
          v-for="item in output[group.name]"
          :node="$page.series.edges[item].node"
          :key="`${group.name}-${item}`"
        />
      </template>
    </tbody>
  </table>
</template>

<script>
import SeriesItem from '~/components/catalog/SeriesTableItem.vue'

export default {
  components: {
    SeriesItem
  },

  props: {
    filters: {
      type: Array
    },
    
    groups: {
      type: Array
    }
  },

  computed: {
    output() {
      const all = this.$page.series.edges

      /*
      filter: {
        trait: 'endShapes'
        value: ['rect-sharp', 'rect-r', 'rect-f']
      }
      */
      const filterCondition = () => {

      }

      const result = {}
      for (let i = 0, len = all.length; i < len; i++) {
        all[i].node.cuttingPartLength.forEach(element => {
          (result[element] = result[element] || []).push(i)
        })
      }

      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modules/table.scss';

.t {
  margin: 0 -0.5rem;
}

td.group-label {
  padding: 1.8rem 0.5rem 0.5rem;
}
</style>
