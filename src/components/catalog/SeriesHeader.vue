<template>
  <div class="series-header">
    <header class="col-35">
      <div class="series-header-title">
        <h1>{{ node.id.toUpperCase() }}</h1>

        <svg-plain-icon v-if="node.fusion" icon-id="series-fusion" :width="100" :height="25" />

        <div class="series-desc" v-html="node.body" />
      </div>

      <g-image
        v-if="node.productImg.length > 0"
        :src="node.productImg[0]"
        :alt="node.id"
        class="series-img"
      />
    </header>

    <div class="series-body sheet sheet-beige">
      <div class="series-features">
        <div class="series-features-col-40">
          <h3 class="series-dt">Основное применение</h3>
          <ul class="series-dd">
            <li v-for="(m, index) in node.mainUsage" :key="index" class="series-dd-li">
              <span :class="`mat-chip-sm mat-main mat-${m}`">{{ m }}</span>
              {{ materialDesc[m] }}
            </li>
          </ul>

          <template v-if="node.possibleUsage && node.possibleUsage.length > 0">
            <h3 class="series-dt">Возможное применение</h3>
            <ul class="series-dd">
              <li v-for="(m, index) in node.possibleUsage" :key="index" class="series-dd-li">
                <span :class="`mat-chip-sm mat-possible mat-${m}`">{{ m }}</span>
                {{ materialDesc[m] }}
              </li>
            </ul>
          </template>
        </div>

        <div class="series-features-col-30">
          <template v-if="node.coating">
            <h3 class="series-dt">Покрытие</h3>
            <p class="series-dd">{{ featuresDesc[node.coating] }}</p>
          </template>
          <template v-else>
            <h3 class="series-dt">Без покрытия</h3>
            <p></p>
          </template>

          <h3 class="series-dt">Тип хвостовика</h3>
          <p class="series-dd">{{ featuresDesc[node.tail] }}</p>

          <template v-if="node.endShapes && node.endShapes.length > 0">
            <h3 class="series-dt">Форма торца</h3>
            <p class="series-dd">{{ endShapes }}</p>
          </template>

          <template v-if="node.cuttingShapes && node.cuttingShapes.length > 0">
            <h3 class="series-dt">Форма режущей части</h3>
            <ul class="series-dd">
              <li
                v-for="(s, index) in node.cuttingShapes"
                :key="index"
                class="series-dd-li"
              >{{ featuresDesc[s] }}</li>
            </ul>
          </template>
        </div>

        <template v-if="node.grooveInclination && node.cogs">
          <div class="series-features-col-30">
            <h3 class="series-dt">Зубья</h3>
            <ul class="series-dd">
              <li
                v-for="(c, index) in node.cogs"
                :key="index"
                class="series-dd-li"
              >{{ getCogsNumberLabel(c.cogsNumber) }}, {{ cogsDesc[c.cogsPitch] }}, {{ getCogsCenterLabel(c.cogsCenter) }}</li>
            </ul>

            <template v-if="node.grooveInclination">
              <h3 class="series-dt">Угол подъема спиральной канавки</h3>
              <p class="series-dd">
                <span class="display-3" v-html="grooveInclination"></span>
              </p>
            </template>
          </div>
        </template>
      </div>
      <div class="series-actions d-print-none">
        <icon-printer
          @click.native="printIt"
          width="30"
          height="30"
          v-tooltip="{ content: 'Распечатать страницу'}"
        />
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
import { parse } from 'path'

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

  data() {
    return {
      materialDesc: {
        p: 'углеродистая и легированная сталь',
        k: 'чугун',
        m: 'нержавеющая сталь',
        h: 'закаленная сталь',
        'h1.1': 'закаленная сталь',
        'h1.2': 'закаленная сталь',
        n: 'цветные металлы',
        n1: 'сплавы на основе алюминия',
        n3: 'сплавы на основе меди',
        s: 'суперсплавы и титан (жаропрочные сплавы)'
      },
      featuresDesc: {
        ng: 'nACo-G',
        tan: 'TiAlN',
        tin: 'TiN',
        pp: 'PurePolish. Полировка',
        cylinder: 'Цилиндрический',
        weldon: 'Weldon',
        sharp: 'торец без фаски, наостро',
        'sharp-r': 'торец с притуплением',
        'sharp-f': 'торец с фаской chх45˚',
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
      if (number > 5) {
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
.series-header-title {
  @extend %grid-row-wrap;
  align-items: baseline;
  padding-bottom: 0.5rem;
}

.series-header {
  @extend %grid-row-wrap;

  width: 100%;
  position: relative;
  margin-bottom: 2rem;

  .print-it {
    flex-basis: 7rem;
    padding: 0.5rem 1rem;
    text-align: right;
  }

  .attr {
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
}

.series-desc {
  flex-basis: auto;
}

@include media-breakpoint-up(md) {
  .desc {
    font-size: 1.25rem;
  }

  .col-35 {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
  }

  .series-body {
    max-width: 65%;
    flex: 0 0 65%;
  }

  .series-features {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2rem;
  }

  .series-features-col-30,
  .series-features-col-40 {
    padding-right: 2rem;
  }

  .series-features-col-30 {
    max-width: 30%;
    flex: 1 1 30%;
  }

  .series-features-col-40 {
    max-width: 40%;
    flex: 1 1 40%;
  }
}


// @TODO fix it!
@media print {
  .col-35 {
    max-width: 35%;
    flex: 0 0 35%;
    padding-right: 3rem;
  }

  .series-body {
    max-width: 65%;
    flex: 0 0 65%;
  }

  .series-features-col-30,
  .series-features-col-40 {
    padding-right: 2rem;
    max-width: 50%;
    flex: 1 1 50%;
  }
}

.series-actions {
  position: absolute;
  top: 1rem;
  right: -1.5rem;
  padding: .5rem;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: $yellow;
  }
}

.series-dd {
  padding: 0;
  margin: 0 0 1rem;
}

ul.series-dd {
  list-style-type: none;
}

.series-dd-li {
  padding-bottom: 0.3rem;
}

h3.series-dt {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.series-img {
  margin-left: -0.75rem;
}
</style>
