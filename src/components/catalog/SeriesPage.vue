<template>
  <div class="page">
    <header class="col-left">
      <div class="title">
        <h1>{{ node.id.toUpperCase() }}</h1>
        <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />

        <div class="desc" v-html="node.body" />
      </div>

      <g-image
        v-if="node.productImg.length > 0"
        :src="node.productImg[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="col-right sheet sheet-beige">
      <div class="features">
        <div class="col-40">
          <h3 class="dt">Основное применение</h3>
          <ul class="dd">
            <li v-for="(m, index) in node.mainUsage" :key="index" class="dd-li">
              <span :class="`mat-chip-sm mat-main mat-${m.charAt(0)}`">{{ m }}</span>
              {{ materialDesc[m] }}
            </li>
          </ul>

          <template v-if="node.possibleUsage && node.possibleUsage.length > 0">
            <h3 class="dt">Возможное применение</h3>
            <ul class="dd">
              <li v-for="(m, index) in node.possibleUsage" :key="index" class="dd-li">
                <span :class="`mat-chip-sm mat-possible mat-${m.charAt(0)}`">{{ m }}</span>
                {{ materialDesc[m] }}
              </li>
            </ul>
          </template>
        </div>

        <div class="col-30">
          <template v-if="node.coating">
            <h3 class="dt">Покрытие</h3>
            <p class="dd">{{ featuresDesc[node.coating] }}</p>
          </template>
          <template v-else>
            <h3 class="dt">Без покрытия</h3>
            <p></p>
          </template>

          <h3 class="dt">Тип хвостовика</h3>
          <p class="dd">{{ featuresDesc[node.tail] }}</p>

          <template v-if="node.endShapes && node.endShapes.length > 0">
            <h3 class="dt">Форма торца</h3>
            <p class="dd">{{ endShapes }}</p>
          </template>

          <template v-if="node.cuttingShapes && node.cuttingShapes.length > 0">
            <h3 class="dt">Форма режущей части</h3>
            <ul class="dd">
              <li
                v-for="(s, index) in node.cuttingShapes"
                :key="index"
                class="dd-li"
              >{{ featuresDesc[s] }}</li>
            </ul>
          </template>
        </div>

        <template v-if="node.grooveInclination && node.cogs">
          <div class="col-30">
            <h3 class="dt">Зубья</h3>
            <ul class="dd">
              <li
                v-for="(c, index) in node.cogs"
                :key="index"
                class="dd-li"
              >{{ getCogsNumberLabel(c.cogsNumber) }}, {{ cogsDesc[c.cogsPitch] }}, {{ getCogsCenterLabel(c.cogsCenter) }}</li>
            </ul>

            <template v-if="node.grooveInclination">
              <h3 class="dt">Угол подъема спиральной канавки</h3>
              <p class="dd">
                <span class="display-3" v-html="grooveInclination"></span>
              </p>
            </template>
          </div>
        </template>
      </div>
      <div class="actions d-print-none" @click="printIt">
        <icon-printer
          width="30"
          height="30"
          v-tooltip="{ content: 'Распечатать страницу'}"
        />
      </div>
    </div>

    <div class="tools">
      <div class="schemes">
        <img
          v-for="(scheme, id) in node.scheme"
          :key="id"
          :src="'/img/schemes/' + scheme.scheme + '.png'"
          class="scheme-img"
        />
      </div>

      <product-items-table
        :fields-set="node.productSeriesSet.set"
        :tools="tools.edges"
        class="product-items"
      />
    </div>
  </div>
</template>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon.vue'
import SvgCogsIcon from '~/components/catalog/SvgCogsIcon.vue'
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'
import IconPrinter from '~/components/IconPrinter.vue'
import ProductItemsTable from '~/components/catalog/ProductItemsTable.vue'
import { materials } from '~/utils/fieldsMapping.js'

export default {
  components: {
    SvgPlainIcon,
    SvgCogsIcon,
    SvgIcon,
    MaterialIcon,
    IconPrinter,
    ProductItemsTable
  },

  props: {
    node: {
      type: Object,
      required: true
    },

    tools: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      materialDesc: materials,
      featuresDesc: {
        ng: 'nACo-G',
        tan: 'TiAlN',
        tin: 'TiN',
        pp: 'PurePolish (полировка)',
        cylinder: 'цилиндрический',
        weldon: 'Weldon',
        'rect-sharp': 'торец без фаски, наостро',
        'rect-r': 'торец с притуплением',
        'rect-f': 'торец с фаской chх45˚',
        radius: 'радиусной торец',
        sphere: 'сферический торец',
        conus: 'конус',
        'inner-radius': 'с внутренним радиусом',
        t: 'Т-образная режущая часть'
      },
      cogsDesc: {
        variable: 'переменный шаг',
        permanent: 'постоянный шаг',
        overlap: 'с перекрытием центра',
        base: 'без режущего центра'
      }
    }
  },

  computed: {
    endShapes() {
      if (this.node.endShapes) {
        return this.node.endShapes.map(i => this.featuresDesc[i]).join('; ')
      } else {
        return ''
      }
    },

    grooveInclination() {
      if (this.node.grooveInclination) {
        return this.node.grooveInclination.angles
          .map(i => `${i}&#xB0;`)
          .join('~')
      } else {
        return ''
      }
    }
  },

  methods: {
    getCogsNumberLabel(s) {
      const number = parseInt(s, 10)
      if (number === 1) {
        return '1 зуб'
      }
      if (number > 1 && number < 5) {
        return `${number} зуба`
      }
      if (number >= 5) {
        return `${number} зубьев`
      }
    },

    getCogsCenterLabel(s) {
      return s === 'overlap' ? 'с перекрытием центра' : 'без режущего центра'
    },

    printIt() {
      if (window) window.print()
    }
  }
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

@include media-breakpoint-up(md) {
  .desc {
    font-size: 1.25rem;
  }

  .col-left {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
  }

  .col-right {
    max-width: 65%;
    flex: 0 0 65%;

  }

  .features {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2rem;
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
}


// @TODO fix it!
@media print {
  .col-left {
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
    max-width: 50%;
    flex: 1 1 50%;
  }
}

.actions {
  position: absolute;
  top: -1.25rem;
  right: -1.5rem;
  padding: .5rem;
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

@include media-breakpoint-up(md) {
  .schemes {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
    padding-top: 3rem;
    position: sticky;
    top: 0;
  }

  .product-items {
    max-width: 65%;
    flex: 0 0 65%;
  }
}

</style>