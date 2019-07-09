<template>
  <div class="series-header">
    <header :to="node.path">
      <div class="series-header-title">
        <h2>{{ node.id.toUpperCase() }}</h2>

        <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />
      </div>

      <g-image
        v-if="node.productImg.length > 0"
        :src="node.productImg[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="body">
      <div class="flex-row">
        <div class="series-material">
          <material-icon v-for="(m, index) in node.mainUsage" :key="index" :mat-id="m" />
        </div>
        <div class="attr">
          <svg-icon v-for="icon in seriesFeatures" :key="icon" :icon-id="icon" />
          <svg-cogs-icon v-for="(obj, index) in node.cogs" :key="index" :cogs="obj" />
          <svg-icon v-if="node.grooveInclination" icon-id="cogs-angle">
            <text
              transform="matrix(1 0 0 1 27 16)"
              style="font-size:12px;"
            >{{ node.grooveInclination.angles[0]}}&#xB0;</text>
            <text
              v-if="node.grooveInclination.angles[1]"
              transform="matrix(1 0 0 1 27 28)"
              style="font-size:12px;"
            >{{ node.grooveInclination.angles[1]}}&#xB0;</text>
          </svg-icon>
        </div>
      </div>

      <div class="flex-row-nowrap">
        <div class="desc" v-html="node.body" />
        <div class="d-print-none print-it">
          <icon-printer
            @click.native="printIt"
            width="30"
            height="30"
            v-tooltip="{ content: 'Распечатать'}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon.vue'
import SvgCogsIcon from '~/components/catalog/SvgCogsIcon.vue'
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'
import IconPrinter from '~/components/IconPrinter.vue'

export default {
  components: {
    SvgPlainIcon,
    SvgCogsIcon,
    SvgIcon,
    MaterialIcon,
    IconPrinter
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  computed: {
    seriesFeatures() {
      return ["coating", "tail", "endShapes", "cuttingShapes", "cogs"].reduce(
        (result, f) => {
          if (this.node[f] && typeof this.node[f] === "string") {
            result.push(`${f}-${this.node[f]}`);
          }
          if (this.node[f] && f === "endShapes") {
            result = result.concat(this.node[f].map(shape => `form-${shape}`));
          }
          if (this.node[f] && f === "cuttingShapes") {
            result = result.concat(
              this.node[f].map(shape => `cutting-${shape}`)
            );
          }
          return result;
        },
        []
      );
    },

    sizesValue() {
      const min = 9
      const max = 99
      const rand = min - 0.5 + Math.random() * (max - min + 1)
      return Math.round(rand)
    }
  },

  methods: {
    printIt() {
      if (window) window.print()
    }
  }
};
</script>

<style lang="scss">
.series-header-title {
  @extend %grid-row-wrap;
  align-items: baseline;
  padding-bottom: .5rem;
}

.series-header {
  @extend %grid-row-wrap;

  width: 100%;
  position: relative;
  margin-top: -1px;

  header {
    max-width: 30%;
    flex: 0 0 30%;
    display: block;
    color: $black;
  }

  .body {
    max-width: 70%;
    flex: 0 0 70%;

    @include media-breakpoint-up(md) {
      padding-left: 40px;
    }

    .desc {
      flex-basis: auto;
    }

    .print-it {
      flex-basis: 7rem;
      padding: .5rem 1rem;
      text-align: right;
    }
  }

  .attr {
    margin-left: auto;
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 0 0 1rem;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

.series-scheme img {
  min-width: 360px;
  height: auto;
}

@include media-breakpoint-up(md) {
  .desc {
    font-size: 1.25rem;
  }
}
</style>
