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
      <template v-for="group in groups">
        <tr :key="`tr-${group.name}`">
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
    groups: {
      type: Array,
      required: true
    }
  },

  computed: {
    output() {
      const all = this.$page.series.edges

      const groups = {}
      for (let i = 0, len = all.length; i < len; i++) {
        all[i].node.cuttingPart.forEach(element => {
          (groups[element] = groups[element] || []).push(i)
        })
      }

      return groups
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
  padding-top: 1.75rem;
}
</style>
