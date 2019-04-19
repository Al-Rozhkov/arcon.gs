<template>
  <tr>
    <td>
      <h2>{{ node.series.toUpperCase() }}</h2>
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
      toolExpanded: false
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
