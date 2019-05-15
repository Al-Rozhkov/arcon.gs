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
        v-if="node.productImg.length > 0"
        :src="node.productImg[0]"
      />
    </td>
    <td>
      <material-icon
        v-for="(m, index) in node.mainUsage"
        :key="index"
        :mat-id="m"
      />
    </td>
    <td class="possible-usage">
      <material-icon
        v-for="(m, index) in node.possibleUsage"
        :key="index"
        :mat-id="m"
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
.possible-usage {
  opacity: .5;
}
</style>
