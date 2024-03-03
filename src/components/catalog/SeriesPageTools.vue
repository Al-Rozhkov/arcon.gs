<template>
  <div class="series-page-tools">
    <div class="schemes">
      <div v-for="scheme in schemes" :key="scheme.name" class="scheme">
        <span class="scheme-name">{{ scheme.name }}</span>
        <Component :is="scheme.component" :tool="highlightedTool" class="svg-scheme" />
      </div>
    </div>

    <product-items-table :fields-set="node.productSeriesSet ? node.productSeriesSet.set : undefined
        " :tools="tools.edges" @highlight="onRowHighlight" class="product-items" />
  </div>
</template>

<script>
import ProductItemsTable from '~/components/catalog/ProductItemsTable'

export default {
  components: {
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
    schemeComponents() {
      return this.node.scheme.reduce((acc, node) => {
        acc[node.scheme] = () => import(`@/components/scheme/${node.scheme}`)
        return acc;
      }, {})
    },
    schemes() {
      if (this.highlightedTool) {
        const schemeItem = this.node.scheme.find(
          (n) => n.name.toUpperCase() === this.highlightedTool.form
        )
        if (schemeItem) {
          return [{
            name: schemeItem.name.toUpperCase(),
            component: this.schemeComponents[schemeItem.scheme],
          }]
        }
      }

      return this.node.scheme.map((node) => {
        return {
          name: node.name.toUpperCase(),
          component: this.schemeComponents[node.scheme],
        }
      })
    },
  },

  methods: {
    onRowHighlight(payload) {
      this.highlightedTool = payload
    },
  },
}
</script>

<style lang="scss">
.series-page-tools {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  align-items: flex-start;

  .schemes {
    width: 100%;

    .scheme {
      margin-bottom: 3rem;
      position: relative;
    }

    .scheme-name {
      position: absolute;
      top: 50%;
      left: -1.75rem;
      margin-top: -1.5rem;
      font-weight: $font-weight-bold;
      font-size: 1.25rem;
      // color: $gray-600;
    }
  }

  .product-items {
    overflow-x: auto;
  }
}

/*
 * Media breakpoint MD
 */
@include media-breakpoint-up(md) {
  .series-page-tools {
    .schemes {
      max-width: 35%;
      flex: 0 0 35%;
      padding-right: 3rem;
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
}

/*
 * Print styles
 */
@media print {
  .series-page-tools {
    .schemes svg {
      width: 50%;
    }
  }
}
</style>
