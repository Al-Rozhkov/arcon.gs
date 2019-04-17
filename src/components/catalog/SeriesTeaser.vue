<template>
  <div
    class="series-item"
    :class="{ expanded: toolExpanded }"
  >
    <header @click="expandTool">
      <h3>{{ node.series }}</h3>
      <g-image
        v-if="node.imgTeaser"
        :src="node.imgTeaser"
        :alt="node.series"
        class="series-img"
      />
    </header>

    <div class="series-body">
      <div class="row">
        <div class="series-material">
          <material-icon
            v-for="(m, index) in node.material"
            :key="index"
            :mat-id="m"
          />
        </div>
        <div class="series-attr">
          <svg-icon
            v-for="icon in seriesFeatures"
            :key="icon"
            :icon-id="icon"
          />
        </div>
      </div>
      <div v-html="node.body" />
    </div>

    <!-- <transition name="expand"> -->
    <div v-if="toolExpanded" class="series-details">
      <div v-for="(scheme, index) in node.scheme" :key="index" class="series-scheme">
        <img :src="'/img/scheme/' + scheme + '.svg'">
      </div>

      <p class="small">
        Единицы измерения — мм
      </p>
      <table class="d-table">
        <thead class="table-thead">
          <tr>
            <td
              v-for="(col, index) in node.headers"
              :key="index"
              class="table-thead-col"
              :class="index"
              v-html="col"
            />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in node.params" :key="index" class="table-row">
            <td v-for="(col, i) in row" :key="i" class="table-col" :class="i">
              <span v-if="i === 'serial'" class="hd">
                {{ node.code }}
              </span>
              <span class="td">{{ col }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import urlExists from '~/utils/utils'

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
