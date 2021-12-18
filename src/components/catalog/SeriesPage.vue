<template>
  <div class="page">
    <header class="col-left">
      <div class="title">
        <h1 class="h1">{{ node.id.toUpperCase() }}</h1>
        <svg-plain-icon
          v-if="node.fusion"
          icon-id="series-fusion"
          :width="100"
          :height="25"
        />

        <div class="desc" v-html="node.body" />
      </div>

      <g-image
        v-if="node.photos && node.photos.length > 0"
        :src="node.photos[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="col-right sheet sheet-beige">
      <div class="features">
        <div class="col-40">
          <h3 class="dt">{{ $static.tMainUse.value }}</h3>
          <ul class="dd">
            <li v-for="(m, index) in node.mainUsage" :key="index" class="dd-li">
              <span :class="`mat-chip-sm mat-main mat-${m.id.charAt(0)}`">{{
                m.id
              }}</span>
              {{ m.text }}
            </li>
          </ul>

          <template v-if="node.possibleUsage && node.possibleUsage.length > 0">
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

        <div class="col-30">
          <template v-if="node.coating">
            <h3 class="dt">{{ $static.tCoating.value }}</h3>
            <p class="dd">{{ node.coating.text }}</p>
          </template>
          <template v-else>
            <h3 class="dt">{{ $static.tNoCoating.value }}</h3>
            <p></p>
          </template>

          <h3 class="dt">{{ $static.tShankType.value }}</h3>
          <p class="dd">{{ getShankLabel(node.tail) }}</p>

          <template v-if="node.endShapes && node.endShapes.length > 0">
            <h3 class="dt">{{ $static.tFaceType.value }}</h3>
            <p class="dd">{{ node.endShapes.map((e) => e.text).join('; ') }}</p>
          </template>

          <template v-if="node.cuttingShapes && node.cuttingShapes.length > 0">
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
            v-if="node.sharpeningAngle && node.sharpeningAngle.length > 0"
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

        <div class="col-30">
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
                {{ getCogsSpacingLabel(node.cogsPitch) }},
                {{ getCogsCenterLabel(node.cogsCuttingCenter) }}
              </li>
            </ul>
          </template>

          <template v-if="node.grooveInclination">
            <h3 class="dt">{{ $static.tFluteAngle.value }}</h3>
            <p class="dd">
              <span class="display-3" v-html="grooveInclination"></span>
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

      <div class="actions d-print-none" @click="printIt">
        <icon-printer
          width="30"
          height="30"
          v-tooltip="{ content: $static.tPrintPage.value }"
        />
      </div>
    </div>

    <div class="tools pt">
      <div class="schemes" :class="{ highlight: highlightedScheme !== null }">
        <img
          v-for="(scheme, id) in node.scheme"
          :key="id"
          :src="'/img/schemes/' + scheme.scheme + '.png'"
          class="scheme-img"
          :class="{
            highlighted:
              highlightedScheme &&
              scheme.name.toUpperCase() === highlightedScheme,
          }"
        />
      </div>

      <product-items-table
        :fields-set="
          node.productSeriesSet ? node.productSeriesSet.set : undefined
        "
        :tools="tools.edges"
        class="product-items"
        @highlight="onRowHighlight"
      />
    </div>
  </div>
</template>

<static-query>
query {
  tMainUse: t(id: "catalog.overview.main-use") {
    value
  }
  tPossibleUse: t(id: "catalog.overview.possible-use") {
    value
  }
  tCoating: t(id: "catalog.filters.coating") {
    value
  }
  tNoCoating: t(id: "catalog.filters.no-coating") {
    value
  }
  tShankType: t(id: "catalog.page.shank-type") {
    value
  }
  tFaceType: t(id: "catalog.page.face-type") {
    value
  }
  tCuttingPartShape: t(id: "catalog.page.cutting-part-shape") {
    value
  }
  tCuttingPartLength: t(id: "catalog.filters.cutting-length") {
    value
  }
  tFeedAngle: t(id: "catalog.page.feed-angle") {
    value
  }
  tRadiusTolerance: t(id: "catalog.page.radius-tolerance") {
    value
  }
  tCutterDiameterTolerance: t(id: "catalog.page.cutter-diameter-tolerance") {
    value
  }
  tCoolantSupply: t(id: "catalog.filters.coolant-supply") {
    value
  }
  tTeeth: t(id: "catalog.page.teeth") {
    value
  }
  tFluteAngle: t(id: "catalog.page.flute-angle") {
    value
  }
  tToFormThread: t(id: "catalog.page.to-form-thread") {
    value
  }
  tProfile: t(id: "catalog.page.profile") {
    value
  }
  tPrintPage: t(id: "catalog.page.print-page") {
    value
  }
  tCuttingCenter: t(id: "catalog.cogs.cutting-center") {
    value
  }
  tNoCuttingCenter: t(id: "catalog.cogs.no-cutting-center") {
    value
  }
  tShankCylindrical: t(id: "catalog.page.shank-cylindrical") {
    value
  }
  tShankWeldon: t(id: "catalog.page.shank-weldon") {
    value
  }
  tConstantSpacing: t(id: "catalog.page.constant-spacing") {
    value
  }
  tDifferentialSpacing: t(id: "catalog.page.differential-spacing") {
    value
  }
  tTooth1: t(id: "catalog.page.tooth-1") {
    value
  }
  tTeeth4: t(id: "catalog.page.teeth-4") {
    value
  }
  tTeethN: t(id: "catalog.page.teeth-n") {
    value
  }
}
</static-query>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon.vue'
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'
import IconPrinter from '~/components/IconPrinter.vue'
import ProductItemsTable from '~/components/catalog/ProductItemsTable.vue'

export default {
  components: {
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
      highlightedScheme: null,
    }
  },

  computed: {
    grooveInclination() {
      const angles = this.node.grooveInclination
      if (angles && angles.length > 0) {
        return angles.map((i) => `${i}&#xB0;`).join('~')
      } else {
        return ''
      }
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

    getShankLabel(id) {
      const map = {
        'cylinder': this.$static.tShankCylindrical.value.toLowerCase(),
        'weldon': this.$static.tShankWeldon.value.toLowerCase(),
      }
      return map[id]
    },

    getCogsSpacingLabel(id) {
      const map = {
        'permanent': this.$static.tConstantSpacing.value.toLowerCase(),
        'variable': this.$static.tDifferentialSpacing.value.toLowerCase(),
      }
      return map[id]
    },

    getCogsCenterLabel(value) {
      return value
        ? this.$static.tNoCuttingCenter.value.toLowerCase()
        : this.$static.tCuttingCenter.value.toLowerCase()
    },

    onRowHighlight(event) {
      if (this.node.scheme.length > 1) {
        this.highlightedScheme = event
      }
    },

    printIt() {
      if (window) window.print()
    },
  },
}
</script>

<style lang="scss">
.page {
  @extend %grid-row-wrap;

  width: 100%;
  position: relative;
  margin-bottom: 2rem;

  .print-it {
    flex-basis: 7rem;
    padding: 0.5rem 1rem;
    text-align: right;
  }
}

.title {
  @extend %grid-row-wrap;
  align-items: baseline;
  padding-bottom: 0.5rem;
}

.desc {
  width: 100%;
}

.sheet {
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

.sheet-beige {
  background: lighten($orange, 25%);
}

.actions {
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

.features {
  display: flex;
  flex-wrap: wrap;
  margin-right: -2rem;
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

.series-img {
  margin-left: -0.75rem;
}

.tools {
  @extend %grid-row-wrap;
  width: 100%;
  position: relative;
  align-items: flex-start;
}

.scheme-img {
  margin-bottom: 3rem;
}

/*
 * Media breakpoint MD
 */
@include media-breakpoint-up(md) {
  .desc {
    font-size: 1.25rem;
  }

  .col-left,
  .schemes {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
  }

  .col-right {
    max-width: 65%;
    flex: 0 0 65%;
  }

  .col-30,
  .col-40 {
    padding-right: 2rem;
  }

  .col-30 {
    max-width: 30%;
    flex: 1 1 30%;
  }

  .col-40 {
    max-width: 40%;
    flex: 1 1 40%;
  }

  .schemes {
    padding-top: 3rem;
    position: sticky;
    top: 0;

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
  .page {
    font-size: 0.8rem;
  }

  .h1 {
    font-size: 2rem;
  }

  .desc {
    font-size: 1rem;
  }

  .col-left,
  .schemes {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 2rem;
  }

  .col-right {
    max-width: 65%;
    flex: 0 0 65%;
  }

  .col-30 {
    max-width: 30%;
    flex: 1 1 30%;
  }

  .col-40 {
    max-width: 40%;
    flex: 1 1 40%;
  }

  .col-30,
  .col-40 {
    padding-right: 1.5rem;
  }

  .schemes {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
