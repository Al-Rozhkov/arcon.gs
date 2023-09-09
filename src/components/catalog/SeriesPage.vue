<template>
  <div class="page">
    <LazyHydrate when-idle>
      <div class="page-header">
        <header class="series-header">
          <h1 class="h1" :class="{ 'series-fusion-icon': node.fusion }">
            {{ node.id.toUpperCase() }}
          </h1>

          <div class="series-header__content" v-html="node.content" />

          <g-image
            v-if="node.photos && node.photos.length"
            :src="node.photos[0]"
            :alt="node.id"
            class="series-img"
          />
        </header>

        <div class="series-features">
          <div class="series-features__grid">
            <!-- Column 40% width -->
            <div>
              <h3 class="dt">{{ $static.tMainUse.value }}</h3>
              <ul class="dd">
                <li
                  v-for="(m, index) in node.mainUsage"
                  :key="index"
                  class="dd-li"
                >
                  <span :class="`mat-chip-sm mat-main mat-${m.id.charAt(0)}`">{{
                    m.id
                  }}</span>
                  {{ m.text }}
                </li>
              </ul>

              <template v-if="node.possibleUsage && node.possibleUsage.length">
                <h3 class="dt">{{ $static.tPossibleUse.value }}</h3>
                <ul class="dd">
                  <li
                    v-for="(m, index) in node.possibleUsage"
                    :key="index"
                    class="dd-li"
                  >
                    <span
                      :class="`mat-chip-sm mat-possible mat-${m.id.charAt(0)}`"
                      >{{ m.id }}</span
                    >
                    {{ m.text }}
                  </li>
                </ul>
              </template>
            </div>

            <!-- Column 30% width -->
            <div>
              <template v-if="node.coating">
                <h3 class="dt">{{ $static.tCoating.value }}</h3>
                <p class="dd">{{ node.coating.text }}</p>
              </template>
              <template v-else>
                <h3 class="dt">{{ $static.tNoCoating.value }}</h3>
                <p></p>
              </template>

              <h3 class="dt">{{ $static.tShankType.value }}</h3>
              <p class="dd">{{ getShankLabel }}</p>

              <template v-if="node.endShapes && node.endShapes.length">
                <h3 class="dt">{{ $static.tFaceType.value }}</h3>
                <p class="dd">
                  {{ node.endShapes.map((e) => e.text).join('; ') }}
                </p>
              </template>

              <template v-if="node.cuttingShapes && node.cuttingShapes.length">
                <h3 class="dt">{{ $static.tCuttingPartShape.value }}</h3>
                <ul class="dd">
                  <li
                    v-for="(s, index) in node.cuttingShapes"
                    :key="index"
                    class="dd-li"
                  >
                    {{ s.text }}
                  </li>
                </ul>
              </template>

              <template
                v-if="node.sharpeningAngle && node.sharpeningAngle.length"
              >
                <h3 class="dt">{{ $static.tFeedAngle.value }}</h3>
                <p class="dd">
                  {{ node.sharpeningAngle.map((i) => `${i}&#xB0;`).join(', ') }}
                </p>
              </template>

              <template v-if="node.allowanceRadius">
                <h3 class="dt">{{ $static.tRadiusTolerance.value }}</h3>
                <p class="dd">{{ node.allowanceRadius }}</p>
              </template>

              <template v-if="node.allowanceCuttingDiameter">
                <h3 class="dt">{{ $static.tCutterDiameterTolerance.value }}</h3>
                <p class="dd">{{ node.allowanceCuttingDiameter }}</p>
              </template>

              <template v-if="node.coolantSupply">
                <h3 class="dt">{{ $static.tCoolantSupply.value }}</h3>
                <p class="dd">{{ node.coolantSupply.text }}</p>
              </template>
            </div>

            <!-- Column 30% width -->
            <div>
              <template v-if="node.cogsNumber && node.cogsPitch">
                <h3 class="dt">{{ $static.tTeeth.value }}</h3>
                <ul class="dd">
                  <li
                    v-for="(c, index) in node.cogsNumber"
                    :key="index"
                    class="dd-li"
                  >
                    {{ getCogsNumberLabel(c) }},
                  </li>
                  <li>
                    {{ getCogsSpacingLabel }},
                    {{ getCogsCenterLabel }}
                  </li>
                </ul>
              </template>

              <template v-if="node.grooveInclination">
                <h3 class="dt">{{ $static.tFluteAngle.value }}</h3>
                <p class="dd">
                  <span
                    class="display-3"
                    :v-html="
                      node.grooveInclination.map((i) => `${i}&#xB0;`).join('~')
                    "
                  ></span>
                </p>
              </template>

              <template v-if="node.toolForming">
                <h3 class="dt">{{ $static.tToFormThread.value }}</h3>
                <p class="dd">{{ node.toolForming }}</p>
              </template>

              <template v-if="node.toolProfile">
                <h3 class="dt">{{ $static.tProfile.value }}</h3>
                <p class="dd">{{ node.toolProfile }}</p>
              </template>
            </div>
          </div>

          <div class="series-header__actions d-print-none" @click="printIt">
            <icon-printer
              width="30"
              height="30"
              v-tooltip="{ content: $static.tPrintPage.value }"
            />
          </div>
        </div>
      </div>
    </LazyHydrate>
    <!-- End of Page Header -->

    <!-- Product items table (default view) -->
    <div class="tools">
      <div class="schemes">
        <Component
          v-for="(scheme, i) in schemes"
          :key="i"
          :is="scheme"
          class="svg-scheme"
          :tool="highlightedTool"
        >
        </Component>
      </div>

      <product-items-table
        :fields-set="
          node.productSeriesSet ? node.productSeriesSet.set : undefined
        "
        :tools="tools.edges"
        @highlight="onRowHighlight"
        class="product-items"
      />
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

import SvgPlainIcon from '~/components/catalog/SvgPlainIcon'
import SvgIcon from '~/components/catalog/SvgFeatureIcon'
import MaterialIcon from '~/components/catalog/MaterialIcon'
import IconPrinter from '~/components/IconPrinter'
import ProductItemsTable from '~/components/catalog/ProductItemsTable'

export default {
  components: {
    LazyHydrate,
    SvgPlainIcon,
    SvgIcon,
    MaterialIcon,
    IconPrinter,
    ProductItemsTable,
  },

  props: {
    node: {
      type: Object,
      required: true,
    },

    tools: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      highlightedTool: null,
    }
  },

  computed: {
    schemes() {
      if (this.highlightedTool) {
        const schemeItem = this.node.scheme.find(
          (n) => n.name.toUpperCase() === this.highlightedTool.form
        )
        if (schemeItem)
          return [() => import(`@/components/scheme/${schemeItem.scheme}`)]
      }
      return this.node.scheme.map((node) => {
        return () => import(`@/components/scheme/${node.scheme}`)
      })
    },

    getShankLabel() {
      return {
        cylinder: this.$static.tShankCylindrical.value.toLowerCase(),
        weldon: this.$static.tShankWeldon.value.toLowerCase(),
      }[this.node.tail]
    },

    getCogsSpacingLabel() {
      return {
        permanent: this.$static.tConstantSpacing.value.toLowerCase(),
        variable: this.$static.tDifferentialSpacing.value.toLowerCase(),
      }[this.node.cogsPitch]
    },

    getCogsCenterLabel() {
      return this.node.cogsCuttingCenter
        ? this.$static.tNoCuttingCenter.value.toLowerCase()
        : this.$static.tCuttingCenter.value.toLowerCase()
    },
  },

  methods: {
    getCogsNumberLabel(s) {
      const number = parseInt(s, 10)
      if (number === 1) {
        return `1 ${this.$static.tTooth1.value}`
      }
      if (number > 1 && number < 5) {
        return `${number} ${this.$static.tTeeth4.value}`
      }
      if (number >= 5) {
        return `${number} ${this.$static.tTeethN.value}`
      }
    },

    onRowHighlight(payload) {
      this.highlightedTool = payload
    },

    printIt() {
      if (window) window.print()
    },
  },
}
</script>

<style lang="scss">
.page-header {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
}

.series-img {
  margin: 0 0 1.5rem -0.75rem;
}

.series-features {
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  background: lighten($orange, 25%);
}

.series-header__content {
  width: 100%;
  margin-bottom: 0.75rem;
}

.series-header__actions {
  position: absolute;
  top: -1.25rem;
  right: -1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: $yellow;
  }
}

.dd {
  padding: 0;
  margin: 0 0 1rem;
}

ul.dd {
  list-style-type: none;
}

.dd-li {
  padding-bottom: 0.3rem;
}

h3.dt {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.schemes {
  width: 100%;
}

.tools {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  align-items: flex-start;
}

.svg-scheme {
  margin-bottom: 3rem;
}

.product-items {
  overflow-x: scroll;
}

/*
 * Media breakpoint MD
 */
@include media-breakpoint-up(md) {
  .series-header__content {
    font-size: 1.25rem;
  }

  .series-header,
  .schemes {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
  }

  .series-features {
    max-width: 65%;
    flex: 0 0 65%;
  }

  .series-features__grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 4fr 3fr 3fr;
  }

  .schemes {
    padding-top: 1rem;
    @supports (position: sticky) {
      position: sticky;
      top: 0;
      z-index: $zindex-sticky;
    }

    &.highlight img {
      opacity: 0.3;
    }

    &.highlight img.highlighted {
      opacity: 1;
    }
  }

  .product-items {
    max-width: 65%;
    flex: 0 0 65%;
  }
}

/*
 * Print styles
 */
@media print {
  .page-header {
    font-size: 0.8rem;
  }

  .h1 {
    font-size: 2rem;
  }

  .series-header__content {
    font-size: 1rem;
  }

  .series-header {
    max-width: 50%;
    flex: 0 0 50%;
    padding-right: 2rem;
  }

  .series-features {
    flex: 1 0 100%;
  }

  .series-features__grid {
    grid-template-columns: 4fr 3fr 3fr;
    gap: 1.5rem;
  }

  .schemes svg {
    width: 50%;
  }
}
</style>

<static-query>
query {
  tMainUse: t(id: "catalog.overview.main-use") { value }
  tPossibleUse: t(id: "catalog.overview.possible-use") { value }
  tCoating: t(id: "catalog.filters.coating") { value }
  tNoCoating: t(id: "catalog.filters.no-coating") { value }
  tShankType: t(id: "catalog.page.shank-type") { value }
  tFaceType: t(id: "catalog.page.face-type") { value }
  tCuttingPartShape: t(id: "catalog.page.cutting-part-shape") { value }
  tCuttingPartLength: t(id: "catalog.filters.cutting-length") { value }
  tFeedAngle: t(id: "catalog.page.feed-angle") { value }
  tRadiusTolerance: t(id: "catalog.page.radius-tolerance") { value }
  tCutterDiameterTolerance: t(id: "catalog.page.cutter-diameter-tolerance") { value }
  tCoolantSupply: t(id: "catalog.filters.coolant-supply") { value }
  tTeeth: t(id: "catalog.page.teeth") { value }
  tFluteAngle: t(id: "catalog.page.flute-angle") { value }
  tToFormThread: t(id: "catalog.page.to-form-thread") { value }
  tProfile: t(id: "catalog.page.profile") { value }
  tPrintPage: t(id: "catalog.page.print-page") { value }
  tCuttingCenter: t(id: "catalog.cogs.cutting-center") { value }
  tNoCuttingCenter: t(id: "catalog.cogs.no-cutting-center") { value }
  tShankCylindrical: t(id: "catalog.page.shank-cylindrical") { value }
  tShankWeldon: t(id: "catalog.page.shank-weldon") { value }
  tConstantSpacing: t(id: "catalog.page.constant-spacing") { value }
  tDifferentialSpacing: t(id: "catalog.page.differential-spacing") { value }
  tTooth1: t(id: "catalog.page.tooth-1") { value }
  tTeeth4: t(id: "catalog.page.teeth-4") { value }
  tTeethN: t(id: "catalog.page.teeth-n") { value }
}
</static-query>
