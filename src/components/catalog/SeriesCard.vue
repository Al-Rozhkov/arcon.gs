<template>
  <g-link :to="node.path" class="series-card">
    <header class="header">
      <h3 class="h3">{{ node.id.toUpperCase() }}</h3>
      <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />
      <g-image
        v-if="node.photos && node.photos.length > 0"
        :src="node.photos[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="series-body">
      <div class="flex-row">
        <div class="series-material">
          <div v-if="node.mainUsage && node.mainUsage.length > 0" class="series-material-row">
            <span class="label">Основное применение:</span>
            <material-icon v-for="(m, index) in node.mainUsage" :key="index" :mat-id="m" />
          </div>
          <div
            v-if="node.possibleUsage && node.possibleUsage.length > 0"
            class="series-material-row"
          >
            <span class="label">Возможное применение:</span>
            <material-icon
              v-for="(m, index) in node.possibleUsage"
              :key="index"
              :mat-id="m"
              :mat-main="false"
            />
          </div>
        </div>
        <div class="series-attr">
          <svg-icon v-for="(icon, index) in seriesFeatures" :key="`f${index}`" :icon-id="icon" />
          <svg-cogs-icon v-for="(obj, index) in node.cogs" :key="`c${index}`" :cogs="obj" />
          <svg-icon
            v-if="node.grooveInclination && node.grooveInclination.length > 0"
            icon-id="cogs-angle"
          >
            <text
              transform="matrix(1 0 0 1 27 16)"
              style="font-size:12px;"
            >{{ node.grooveInclination[0]}}&#xB0;</text>
            <text
              v-if="node.grooveInclination[1]"
              transform="matrix(1 0 0 1 27 28)"
              style="font-size:12px;"
            >{{ node.grooveInclination[1]}}&#xB0;</text>
          </svg-icon>
          <svg-icon
            v-if="node.cuttingFluid && node.cuttingFluid !== 'none'"
            :icon-id="'cutting-fluid-' + node.cuttingFluid"
          />
          <svg-icon v-if="node.toolLength" icon-id="tool-length">
            <text transform="matrix(1 0 0 1 8 34)" class="tool-length-text">{{ node.toolLength }}</text>
          </svg-icon>
          <svg-icon v-if="node.allowanceCuttingDiameter" icon-id="allowance-cutting-diameter">
            <text
              transform="matrix(1 0 0 1 12 34)"
              class="allowance-text"
            >{{ node.allowanceCuttingDiameter }}</text>
          </svg-icon>
        </div>
      </div>
      <div v-html="node.body" />
    </div>
  </g-link>
</template>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon'
import SvgCogsIcon from '~/components/catalog/SvgCogsIcon'
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import MaterialIcon from '~/components/catalog/MaterialIcon'

export default {
  components: {
    SvgPlainIcon,
    SvgCogsIcon,
    SvgIcon,
    MaterialIcon,
  },

  props: {
    node: {
      type: Object,
      required: true,
    },
  },

  computed: {
    seriesFeatures() {
      return ['coating', 'tail', 'endShapes', 'cuttingShapes'].reduce(
        (result, f) => {
          if (this.node[f] && typeof this.node[f] === 'string') {
            result.push(`${f}-${this.node[f]}`)
          }
          if (this.node[f] && f === 'endShapes') {
            result = result.concat(this.node[f].map((shape) => `form-${shape}`))
          }
          if (this.node[f] && f === 'cuttingShapes') {
            result = result.concat(
              this.node[f].map((shape) => `cutting-${shape}`)
            )
          }
          return result
        },
        []
      )
    },

    sizesValue() {
      const min = 9
      const max = 99
      const rand = min - 0.5 + Math.random() * (max - min + 1)
      return Math.round(rand)
    },
  },
}
</script>

<style lang="scss" scoped>
.series-card {
  @extend %grid-row-wrap;

  width: 100%;

  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -1px;
  color: $black;

  &:hover {
    background: #ffffff;
    box-shadow: 0px 5px 60px 0 rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border-bottom: 0;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

.header {
  max-width: 30%;
  flex: 0 0 30%;
  display: block;
}

.h3 {
  display: inline-block;
  font-size: 1.75rem;
  margin: 0 0 1rem;
}

.series-details {
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.5rem;
}

.series-body {
  max-width: 70%;
  flex: 0 0 70%;
}

.series-attr {
  margin-left: auto;
  margin-bottom: 0.75rem;
}

.series-material {
  margin-bottom: 0.75rem;

  .label {
    color: $gray-700;
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
}

@include media-breakpoint-up(md) {
  .series-card {
    padding: 20px 30px;
  }

  .series-details {
    width: 70%;
    margin: 0 0 0 auto;
    padding-left: 40px;
  }

  .series-body {
    padding-left: 40px;
  }
}

.tool-length-text {
  font-size: 20px;
  font-weight: 700;
  color: $lila;
  fill: $lila;
}

.allowance-text {
  font-size: 24px;
  font-weight: 700;
  color: $indigo;
  fill: $indigo;
}
</style>
