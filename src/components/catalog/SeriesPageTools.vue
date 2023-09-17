<template>
  <div class="series-page-tools">
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
  }

  .svg-scheme {
    margin-bottom: 3rem;
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
