<template>
  <tr>
    <td>
      <h3>{{ node.series.toUpperCase() }}</h3>
    </td>
    <td>
      {{ node.myField }}
    </td>
    <td>
      <svg-icon
        :icon-id="'coating-' + node.coating"
        :size="30"
      />
    </td>
    <td>
      <g-image
        v-if="node.imgTeaser"
        :src="node.imgTeaser"
      />
    </td>
    <td
      v-for="key in usageKeys"
      :key="key"
    >
      <material-icon
        v-if="node.material.some(e => e === key)"
        :mat-id="key"
      />
    </td>
  </tr>
</template>

<script>
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import MaterialIcon from '~/components/catalog/MaterialIcon'

export default {
  components: {
    SvgIcon,
    MaterialIcon
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  data: () => {
    return {
      usageKeys: [
        'p', 'k', 'm', 'n1', 'n3', 's', 'h1.1', 'h1.2'
      ]
    }
  },

  computed: {
    seriesFeatures() {
      return [
        'coating',
        'tail',
        'endShapes',
        'cogs',
        'grooveInclination'
      ].reduce((result, f) => {
        if (this.node[f] && typeof this.node[f] === "string") {
          result.push(`${f}-${this.node[f]}`)
        }
        if (this.node[f] && f === 'endShapes') {
          result = result.concat(
            this.node[f].map(shape => `form-${shape}`)
          )
        }
        return result
      }, [])
    }
  },

  methods: {
    expandTool() {
      this.toolExpanded = !this.toolExpanded
    }
  }
}
</script>

<style lang="scss">

</style>
