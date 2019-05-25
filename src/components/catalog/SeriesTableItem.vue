<template>
  <tr>
    <td class="td-flex">
      <g-link
        :to="node.path"
        class="link-flex"
      >
        <h2>{{ node.id.toUpperCase() }}</h2>
        <g-image
          v-if="node.productImg.length > 0"
          :src="node.productImg[0]"
        />
      </g-link>
    </td>
    <td>
      <svg-icon
        :icon-id="'coating-' + node.coating"
        :size="30"
      />
    </td>
    <td>
      <material-icon
        v-for="(m, index) in node.mainUsage"
        :key="index"
        :mat-id="m"
      />
    </td>
    <td>
      <material-icon
        v-for="(m, index) in node.possibleUsage"
        :key="index"
        :mat-id="m"
        :mat-main="false"
      />
    </td>
    <td>
      <svg-icon
        v-if="node.grooveInclination"
        icon-id="cogs-angle"
      >
        <text transform="matrix(1 0 0 1 27 16)" style="font-size:12px;">{{ node.grooveInclination.angles[0]}}&#xB0;</text>
        <text
          v-if="node.grooveInclination.angles[1]"
          transform="matrix(1 0 0 1 27 28)"
          style="font-size:12px;"
        >{{ node.grooveInclination.angles[1]}}&#xB0;</text>
      </svg-icon>
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
        'cogs'
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
.link-flex {
  @extend %grid-row-wrap;
  color: $black;

  h2 {
    padding-top: .75rem;
    padding-right: .5rem;
  }

  img {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
