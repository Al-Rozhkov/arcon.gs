<template>
  <div class="page">
    <header class="col-left">
      <div class="title">
        <h1 class="h1">{{ node.id.toUpperCase() }}</h1>
        <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />

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
          <h3 class="dt">Основное применение</h3>
          <ul class="dd">
            <li v-for="(m, index) in node.mainUsage" :key="index" class="dd-li">
              <span :class="`mat-chip-sm mat-main mat-${m.charAt(0)}`">{{ m }}</span>
              {{ legendMaterials[m] }}
            </li>
          </ul>

          <template v-if="node.possibleUsage && node.possibleUsage.length > 0">
            <h3 class="dt">Возможное применение</h3>
            <ul class="dd">
              <li v-for="(m, index) in node.possibleUsage" :key="index" class="dd-li">
                <span :class="`mat-chip-sm mat-possible mat-${m.charAt(0)}`">{{ m }}</span>
                {{ legendMaterials[m] }}
              </li>
            </ul>
          </template>
        </div>

        <div class="col-30">
          <template v-if="node.coating">
            <h3 class="dt">Покрытие</h3>
            <p class="dd">{{ coatingDesc[node.coating] }}</p>
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
              >{{ legendCuttingShapes[s] }}</li>
            </ul>
          </template>

          <template v-if="node.sharpeningAngle && node.sharpeningAngle.length > 0">
            <h3 class="dt">Угол заточки</h3>
            <p class="dd">{{ node.sharpeningAngle.map(i => `${i}&#xB0;`).join(', ') }}</p>
          </template>

          <template v-if="node.allowanceRadius">
            <h3 class="dt">Допуск на радиус</h3>
            <p class="dd">{{ node.allowanceRadius }}</p>
          </template>

          <template v-if="node.allowanceCuttingDiameter">
            <h3 class="dt">Допуск на диаметр режущей части</h3>
            <p class="dd">{{ node.allowanceCuttingDiameter }}</p>
          </template>

          <template v-if="node.cuttingFluid">
            <h3 class="dt">Подвод СОЖ</h3>
            <p class="dd">{{ cuttingFluidDesc[node.cuttingFluid] }}</p>
          </template>
        </div>

        <div class="col-30">
          <template v-if="node.cogsNumber && node.cogsPitch">
            <h3 class="dt">Зубья</h3>
            <ul class="dd">
              <li
                v-for="(c, index) in node.cogsNumber"
                :key="index"
                class="dd-li"
              >{{ getCogsNumberLabel(c) }},</li>
              <li>{{ cogsDesc[node.cogsPitch] }}, {{ getCogsCenterLabel(node.cogsCuttingCenter) }}</li>
            </ul>
          </template>

          <template v-if="node.grooveInclination">
            <h3 class="dt">Угол подъема спиральной канавки</h3>
            <p class="dd">
              <span class="display-3" v-html="grooveInclination"></span>
            </p>
          </template>

          <template v-if="node.toolForming">
            <h3 class="dt">Для формирования резьбы</h3>
            <p class="dd">{{ node.toolForming }}</p>
          </template>

          <template v-if="node.toolProfile">
            <h3 class="dt">Профиль</h3>
            <p class="dd">{{ node.toolProfile }}</p>
          </template>
        </div>
      </div>

      <div class="actions d-print-none" @click="printIt">
        <icon-printer width="30" height="30" v-tooltip="{ content: 'Распечатать страницу'}" />
      </div>
    </div>

    <div class="tools pt">
      <div class="schemes" :class="{ highlight: highlightedScheme !== null }">
        <img
          v-for="(scheme, id) in node.scheme"
          :key="id"
          :src="'/img/schemes/' + scheme.scheme + '.png'"
          class="scheme-img"
          :class="{ highlighted: highlightedScheme && scheme.name.toUpperCase() === highlightedScheme }"
        />
      </div>

      <product-items-table
        :fields-set="node.productSeriesSet ? node.productSeriesSet.set : undefined"
        :tools="tools.edges"
        class="product-items"
        @highlight="onRowHighlight"
      />
    </div>
  </div>
</template>

<script>
import SvgPlainIcon from '~/components/catalog/SvgPlainIcon.vue'
import SvgIcon from '~/components/catalog/SvgFeatureIcon.vue'
import MaterialIcon from '~/components/catalog/MaterialIcon.vue'
import IconPrinter from '~/components/IconPrinter.vue'
import ProductItemsTable from '~/components/catalog/ProductItemsTable.vue'
import { materials, cuttingShapes } from '~/utils/fieldsMapping.js'

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
      legendMaterials: materials,
      legendCuttingShapes: cuttingShapes,
      coatingDesc: {
        ng: 'nACo-G',
        tan: 'TiAlN',
        tin: 'TiN',
        pp: 'PurePolish (полировка)',
      },
      featuresDesc: {
        cylinder: 'цилиндрический',
        weldon: 'Weldon',
        'rect-sharp': 'торец без фаски, наостро',
        'rect-r': 'торец с притуплением',
        'rect-f': 'торец с фаской chх45˚',
        radius: 'радиусной торец',
        sphere: 'сферический торец',
      },
      cogsDesc: {
        variable: 'переменный шаг',
        permanent: 'постоянный шаг',
      },
      cuttingFluidDesc: {
        in: 'Внутренний',
        out: 'Внешний',
        none: 'Без подвода СОЖ',
      },
      highlightedScheme: null,
    }
  },

  computed: {
    endShapes() {
      if (this.node.endShapes) {
        return this.node.endShapes.map((i) => this.featuresDesc[i]).join('; ')
      } else {
        return ''
      }
    },

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
      return s ? 'без режущего центра' : 'с перекрытием центра'
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
