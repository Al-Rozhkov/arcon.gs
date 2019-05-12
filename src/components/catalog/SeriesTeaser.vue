<template>
  <div
    class="series-item"
  >
    <header>
      <h3>{{ node.series.toUpperCase() }}</h3>
      <svg-icon
        v-if="node.fusion"
        icon-id="series-fusion"
        :width="100"
        :height="25"
      />
      <g-image
        v-if="node.imgTeaser"
        :src="node.imgTeaser"
        :alt="node.series"
        class="series-img"
      />
    </header>

    <div class="series-body">
      <div class="flex-row">
        <div class="series-material">
          <material-icon
            v-for="(m, index) in node.mainUsage"
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

    <div class="series-sizes">
      {{ sizesValue }} размеров
    </div>

    <!-- <transition name="expand"> -->
    <!-- <div v-if="toolExpanded" class="series-details">
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
    </div> -->
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

  /* data: () => {
    return {
      toolExpanded: false
    }
  }, */

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
  border-bottom: 1px solid rgba(0,0,0,.1);
  margin-top: -1px;

  &:last-child {
    border-bottom: 0;
  }

  @include media-breakpoint-up(lg) {
    padding: 20px 30px;
  }

  /* &.expanded {
    border-left: 2px solid fade-out($color: #000000, $amount: .95)
  } */

  header {
    max-width: 30%;
    flex: 0 0 30%;
    cursor: pointer;

    &:hover {
      &:before {
        @include pseudo();
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 5px 60px 0 rgba(0,0,0,0.1);
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
    margin-bottom: .75rem;
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

  /* &:hover {
    // background: #ffffff;
    border-bottom: 1px solid transparent;
    // box-shadow: 0px 5px 60px 0 rgba(0,0,0,0.1);
  } */
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

.series-scheme img {
  min-width: 360px;
  height: auto;
}

.table-thead,
.table-row {
  width: 100%;
}

.table-col,
.table-thead-col {
  padding: .2rem .3rem;
}

.d-table {
  margin: 0 -.3rem;

  .table-thead {
    font-weight: bold;
    border-bottom: 1px solid $gray-300;
    margin-bottom: 1rem;
  }

  .table-row:hover {
    background: fade-out($color: $yellow, $amount: .8);

    .hd {
      visibility: visible;
    }
  }

  .td {
    padding-right: 1.25rem;
  }

  .hd {
    visibility: hidden;
  }

  /* .serial {
    max-width: 8rem;
    flex: 2 1 8rem;
  }

  .d1, .d2, .d3, .r {
    max-width: 4rem;
    flex: 1 1 4rem;
  }

  .l1, .l2, .ap, .z {
    max-width: 3rem;
    flex: 1 1 3rem;
  } */

  .table-row .form {
    text-transform: uppercase;
  }
}
</style>
