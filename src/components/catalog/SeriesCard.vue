<template>
  <g-link :to="node.path" class="series-card">
    <header class="header">
      <h3 class="h3">{{ node.id.toUpperCase() }}</h3>
      <svg-plain-icon
        v-if="node.fusion"
        icon-id="series-fusion"
        :width="100"
        :height="25"
      />
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
          <div
            v-if="node.mainUsage && node.mainUsage.length > 0"
            class="series-material-row"
          >
            <span class="label">{{ $static.cMainUse.value }}:</span>
            <material-icon
              v-for="(m, index) in node.mainUsage"
              :key="index"
              :mat-id="m.id"
            />
          </div>
          <div
            v-if="node.possibleUsage && node.possibleUsage.length > 0"
            class="series-material-row"
          >
            <span class="label">{{ $static.cPossibleUse.value }}:</span>
            <material-icon
              v-for="(m, index) in node.possibleUsage"
              :key="index"
              :mat-id="m.id"
              :mat-main="false"
            />
          </div>
        </div>
        <div class="series-attr">
          <svg-icon
            v-for="(icon, index) in seriesFeatures"
            :key="`f${index}`"
            :icon-id="icon"
          />
          <svg-cogs-icon
            v-for="(obj, index) in node.cogs"
            :key="`c${index}`"
            :cogs="obj"
          />
          <svg-icon
            v-if="node.grooveInclination && node.grooveInclination.length > 0"
            icon-id="cogs-angle"
          >
            <text transform="matrix(1 0 0 1 27 16)" style="font-size: 12px"
              >{{ node.grooveInclination[0] }}&#xB0;</text
            >
            <text
              v-if="node.grooveInclination[1]"
              transform="matrix(1 0 0 1 27 28)"
              style="font-size: 12px"
              >{{ node.grooveInclination[1] }}&#xB0;</text
            >
          </svg-icon>
          <svg-icon
            v-if="node.coolantSupply && node.coolantSupply.id !== 'none'"
            :icon-id="'cutting-fluid-' + node.coolantSupply.id"
          />
          <svg-icon v-if="node.toolLength" icon-id="tool-length">
            <text transform="matrix(1 0 0 1 8 34)" class="tool-length-text">{{
              node.toolLength
            }}</text>
          </svg-icon>
          <svg-icon
            v-if="node.allowanceCuttingDiameter"
            icon-id="allowance-cutting-diameter"
          >
            <text transform="matrix(1 0 0 1 12 34)" class="allowance-text">{{
              node.allowanceCuttingDiameter
            }}</text>
          </svg-icon>
        </div>
      </div>
      <div v-html="node.content" />
    </div>
  </g-link>
</template>

<static-query>
query {
  cMainUse: t(id: "catalog.overview.main-use") {
    value
  }
  cPossibleUse: t(id: "catalog.overview.possible-use") {
    value
  }
}
</static-query>

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
      const result = []
      
      if (this.node.coating) {
        result.push(`coating-${this.node.coating.id}`)
      }
      if (this.node.tail) {
        result.push(`tail-${this.node.tail}`)
      }
      if (this.node.endShapes) {
        for (const shape of this.node.endShapes) {
          result.push(`form-${shape.id}`)
        }
      }
      if (this.node.cuttingShapes) {
        for (const shape of this.node.cuttingShapes) {
          result.push(`cutting-${shape.id}`)
        }
      }

      return result
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
  display: flex;
  flex-wrap: wrap;
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
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .label {
    color: $gray-700;
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
}

.series-material-row {
  display: flex;
  gap: 0.25rem;
  align-items: center;
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
  font-weight: $font-weight-bold;
  color: $lila;
  fill: $lila;
}

.allowance-text {
  font-size: 24px;
  font-weight: $font-weight-bold;
  color: $indigo;
  fill: $indigo;
}
</style>
