<template>
  <article class="series-item">
    <g-link :to="node.path">
      <h3>{{ node.id.toUpperCase() }}</h3>
      <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />
      <g-image
        v-if="node.photos && node.photos.length > 0"
        :src="node.photos[0]"
        :alt="node.id"
        class="series-img"
      />
    </g-link>

    <div class="series-body">
      <div class="flex-row">
        <div class="series-material">
          <material-icon v-for="(m, index) in node.mainUsage" :key="index" :mat-id="m" />
        </div>
        <div class="series-attr">
          <svg-icon v-for="icon in seriesFeatures" :key="icon" :icon-id="icon" />
          <svg-cogs-icon v-for="(obj, index) in node.cogs" :key="index" :cogs="obj" />
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
        </div>
      </div>
      <div v-html="node.body" />
    </div>

    <!-- <div class="series-sizes">
      Диапазон диаметров {{ sizesValue }}
    </div>-->
  </article>
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
      return ['coating', 'tail', 'endShapes', 'cuttingShapes'].reduce(
        (result, f) => {
          if (this.node[f] && typeof this.node[f] === 'string') {
            result.push(`${f}-${this.node[f]}`)
          }
          if (this.node[f] && f === 'endShapes') {
            result = result.concat(this.node[f].map(shape => `form-${shape}`))
          }
          if (this.node[f] && f === 'cuttingShapes') {
            result = result.concat(
              this.node[f].map(shape => `cutting-${shape}`)
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
    }
  }
}
</script>

<style lang="scss">
.series-item {
  @extend %grid-row-wrap;

  width: 100%;
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -1px;

  &:last-child {
    border-bottom: 0;
  }

  @include media-breakpoint-up(lg) {
    padding: 20px 30px;
  }

  a {
    max-width: 30%;
    flex: 0 0 30%;
    display: block;
    color: $black;

    &:hover {
      &:before {
        @include pseudo();
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 5px 60px 0 rgba(0, 0, 0, 0.1);
        z-index: -1;
      }
    }
  }

  .series-body {
    max-width: 58%;
    flex: 0 0 58%;

    @include media-breakpoint-up(md) {
      padding-left: 40px;
    }
  }

  .series-sizes {
    max-width: 12%;
    flex: 0 0 12%;
    text-align: right;
  }

  .series-attr {
    margin-left: auto;
    margin-bottom: 0.75rem;
  }

  h3 {
    display: inline-block;
    font-size: 1.75rem;
    margin: 0 0 1rem;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

.series-details {
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.5rem;

  @include media-breakpoint-up(md) {
    width: 70%;
    margin: 0 0 0 auto;
    padding-left: 40px;
  }
}
</style>
