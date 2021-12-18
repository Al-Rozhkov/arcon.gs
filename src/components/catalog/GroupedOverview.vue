<template>
  <div class="grouped-overview">
    <div class="filters">
      <h3 class="f-label">{{ $static.tToolType.value }}</h3>
      <div>
        <b-form-select v-model="filterTypeValue" :options="filterTypeOptions" />
        <!-- <filter-types-list v-model="selected.type" @input="resetFilters" /> -->
      </div>
    </div>

    <!-- Filters -->
    <div
      v-if="filters && typesWithFilters.includes($route.query.type)"
      class="filters"
    >
      <div v-if="filters.endShapes" class="f-group">
        <h3 class="f-label">{{ $static.tEndShape.value }}</h3>
        <filter-end-shape v-model="selected.endShapes" />
      </div>

      <div v-if="filters.toolLength" class="f-group">
        <h3 class="f-label">{{ $static.tLength.value }}</h3>
        <filter-tool-length v-model="selected.toolLength" />
      </div>

      <div v-if="filters.mainUsage" class="f-group">
        <filter-usage v-model="selected.mainUsage" />
      </div>

      <div class="breaker"></div>

      <div v-if="filters.cuttingEdgeLength" class="f-group">
        <h3 class="f-label">{{ $static.tCuttingLength.value }}</h3>
        <filter-cutting-length v-model="selected.cuttingEdgeLength" />
      </div>

      <div v-if="filters.coolantSupply" class="f-group">
        <h3 class="f-label">{{ $static.tCoolantSupply.value }}</h3>
        <filter-coolant-supply v-model="selected.coolantSupply" />
      </div>

      <div v-if="filters.coating" class="f-group">
        <h3 class="f-label">{{ $static.tCoating.value }}</h3>
        <filter-coating v-model="selected.coating" />
      </div>

      <div v-show="filterEnabled" @click="resetFilters" class="f-reset">
        {{ $static.tReset.value }}
      </div>
    </div>
    <!-- End of Filters -->

    <!-- Series Output -->
    <div class="output">
      <div class="thead" v-if="seriesComponent === 'SeriesItem'">
        <div class="flex-row-nowrap">
          <div class="sticky-th" style="flex: 1 1 33%">
            {{ $static.tSeries.value }}
          </div>
          <div class="sticky-th" style="flex: 1 1 15%">
            {{ $static.tMainUse.value }}
          </div>
          <div class="sticky-th" style="flex: 1 1 15%">
            {{ $static.tPossibleUse.value }}
          </div>
          <div class="sticky-th" style="flex: 1 1 37%">
            {{ $static.tOtherParameters.value }}
          </div>
        </div>
      </div>
      <div class="tbody">
        <div v-for="(group, gIndex) in output" :key="gIndex">
          <h3 v-if="group.title" class="group-label">{{ group.title }}</h3>
          <component
            :is="seriesComponent"
            v-for="node in group.nodes"
            :node="node"
            :key="node.id"
          />
        </div>

        <custom-tools-msg v-if="output.length === 0" class="td-empty" />
      </div>
    </div>
    <!-- End of Series Output -->
  </div>
</template>

<static-query>
query ProductFilters {
  types: allProductType(sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        title
        type
      }
    }
  }
  tReset: t(id: "catalog.filters.reset") {
    value
  }
  tToolType: t(id: "catalog.filters.tool-type") {
    value
  }
  tAllTools: t(id: "catalog.all-tools") {
    value
  }
  tEndShape: t(id: "catalog.filters.end-shape") {
    value
  }
  tLength: t(id: "catalog.filters.length") {
    value
  }
  tCuttingLength: t(id: "catalog.filters.cutting-length") {
    value
  }
  tCoating: t(id: "catalog.filters.coating") {
    value
  }
  tSeries: t(id: "catalog.overview.series") {
    value
  }
  tMainUse: t(id: "catalog.overview.main-use") {
    value
  }
  tPossibleUse: t(id: "catalog.overview.possible-use") {
    value
  }
  tCoolantSupply: t(id: "catalog.filters.coolant-supply") {
    value
  }
  tOtherParameters: t(id: "catalog.overview.other-parameters") {
    value
  }
}
</static-query>

<script>
import SeriesItem from '~/components/catalog/SeriesTableItem.vue'
import SeriesCard from '~/components/catalog/SeriesCard.vue'
import CustomToolsMsg from '~/components/catalog/CustomToolsMsg.vue'
import FilterEndShape from '~/components/catalog/FilterEndShape.vue'
import FilterToolLength from '~/components/catalog/FilterToolLength.vue'
import FilterCuttingLength from '~/components/catalog/FilterCuttingLength.vue'
import FilterUsage from '~/components/catalog/FilterUsage.vue'
import FilterCoating from '~/components/catalog/FilterCoating.vue'
import FilterCoolantSupply from '~/components/catalog/FilterCoolantSupply.vue'
import { BFormRadioGroup, BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    SeriesItem,
    SeriesCard,
    CustomToolsMsg,
    FilterEndShape,
    FilterToolLength,
    FilterCuttingLength,
    FilterUsage,
    FilterCoating,
    FilterCoolantSupply,
    BFormRadioGroup,
    BFormSelect,
  },

  props: {
    nodes: {
      type: Array,
      required: true,
    },

    filters: {
      type: Object | Boolean,
      default: false,
    },

    groupBy: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      typesWithFilters: [undefined, 'end-mills', 'drills-spiral'],
      selected: {
        endShapes: null,
        toolLength: null,
        coating: null,
        mainUsage: null,
        cuttingEdgeLength: null,
        coolantSupply: null,
      },
    }
  },

  computed: {
    filterTypeOptions() {
      return [
        {
          text: this.$static.tAllTools.value,
          value: '/catalog',
        },
        ...this.$static.types.edges.map(({ node }) => ({
          text: node.title,
          value: `/catalog/${node.type}/?type=${node.id}`,
        })),
      ]
    },

    filterTypeValue: {
      get() {
        return this.$route.fullPath
      },
      set(value) {
        this.$router.push(value)
        // Reset filters on type change
        this.resetFilters()
      },
    },

    filterEnabled() {
      return Object.keys(this.selected).some(
        (key) => this.selected[key] !== null
      )
    },

    //
    // Filter list of nodes.
    //
    outputFiltered() {
      // Use filters with selected values only
      const filterKeys = this.filters
        ? Object.keys(this.selected).filter((filter) => this.selected[filter])
        : []

      const result = this.nodes.filter(({ node }) => {
        // By series type
        if (this.$route.query.type && this.$route.query.type !== node.type) {
          return false
        }

        // Iterate over selected filters.
        // We should check node againt all enabled conditions. 
        // That's why we return false in case of fail and only return true at the end.
        for (const filterKey of filterKeys) {
          // If series value is array try to find item in it
          if (Array.isArray(node[filterKey])) {
            // If field is array filter can hold multiple variants too
            // we should convert value to array
            const filterValue = Array.isArray(this.selected[filterKey])
              ? this.selected[filterKey]
              : [this.selected[filterKey]]

            // Flatten node values because single value could be an object.
            const nodeValue = node[filterKey].map((value) =>
              typeof value === 'object' ? value.id : value
            )

            if (
              !filterValue.some(
                // @var String selectedVariant
                (selectedVariant) => nodeValue.indexOf(selectedVariant) >= 0
              )
            )
              return false
          } else {
            // If node field is an object than take id property to compare.
            if (typeof node[filterKey] === 'object') {
              if (node[filterKey].id !== this.selected[filterKey]) {
                return false
              }
            } else {
              if (node[filterKey] !== this.selected[filterKey]) {
                return false
              }
            }
          }

          if (this.selected.mainUsage) {
            console.log(
              node.id,
              node.mainUsage.findIndex(
                (usage) => this.selected.mainUsage === usage.id
              )
            )
          }
        }

        return true
      })

      return result
    },

    //
    // If main usage selected, then return the list sorted by main usage result.
    //
    outputSorted() {
      const findCallback = (usage) => this.selected.mainUsage === usage.id

      return this.selected.mainUsage
        ? this.outputFiltered.sort((a, b) => {
            return (
              a.node.mainUsage.findIndex(findCallback) -
              b.node.mainUsage.findIndex(findCallback)
            )
          })
        : this.outputFiltered
    },

    //
    // Show expanded teaser if result number is less than 6.
    //
    seriesComponent() {
      return this.outputFiltered.length > 6 ? 'SeriesItem' : 'SeriesCard'
    },

    //
    // Final output grouped by tool type.
    //
    output() {
      // Group nodes by given value
      return this.outputSorted.reduce((acc, item) => {
        const groupByValue = this.groupBy ? item.node[this.groupBy] : null

        if (!acc[groupByValue]) {
          const groupTitle = this.groupBy
            ? this.$static.types.edges.find(
                ({ node }) => node.id === groupByValue
              )
            : undefined

          acc[groupByValue] = {
            title: groupTitle ? groupTitle.node.title : null,
            nodes: [],
          }
        }
        acc[groupByValue].nodes.push(item.node)

        return acc
      }, {})
    },
  },

  methods: {
    resetFilters() {
      Object.keys(this.selected).forEach((key) => (this.selected[key] = null))
    },
  },
}
</script>

<style lang="scss" scoped>
.output {
  margin: 0 -0.5rem;
  position: relative;
  overflow-x: auto;
}

.group-label {
  font-weight: $font-weight-base;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-top: 1.75rem;
}

.sticky-th {
  padding: 0.5rem 0.5rem;
}

.thead,
.tbody,
.td-empty,
.breaker {
  width: 100%;
}

.thead {
  position: sticky;
  top: -1px;
  font-weight: $font-weight-bold;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none; // Hide it on moblie, but display on desktop
  box-shadow: 0 20px 20px -12px rgba(0, 0, 0, 0.06);
  margin-bottom: 0.75rem;
}

.td-empty {
  padding: 2rem 0.5rem;
  font-size: 1.25rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 0.5rem 0 2rem;
  overflow-x: auto;
}

.breaker {
  height: 0;
}

.f-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  margin-right: 2.5rem;
}

.f-label {
  font-size: 1rem;
  font-weight: $font-weight-base;
  padding: $btn-padding-y 0.5rem $btn-padding-y 0;
  margin: 1px 0;
}

.f-reset {
  position: absolute;
  left: 0;
  bottom: 1rem;
  color: $blue;
  cursor: pointer;
}

@include media-breakpoint-up(sm) {
  .output {
    overflow-x: visible;
  }

  .thead {
    display: block;
  }
}
</style>
