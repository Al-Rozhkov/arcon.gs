<template>
  <div class="grouped-overview">
    <div class="filters">
      <h4 class="f-label">Тип инструмента</h4>
      <div>
        <filter-types-list v-model="selected.type" @input="resetFilters" />
      </div>
    </div>

    <div v-if="filters && typesWithFilters.includes(selected.type)" class="filters">
      <div v-if="filters.endShapes" class="f-group">
        <h4 class="f-label">Форма торца</h4>
        <b-form-radio-group
          id="radios-end-shapes"
          v-model="selected.endShapes"
          :options="filters.endShapes.list"
          buttons
          button-variant="outline-secondary"
          name="radios-end-shapes"
        ></b-form-radio-group>
      </div>

      <div v-if="filters.toolLength" class="f-group">
        <h4 class="f-label">Длина</h4>
        <b-form-radio-group
          id="radios-tool-length"
          v-model="selected.toolLength"
          :options="filters.toolLength.list"
          buttons
          button-variant="outline-secondary"
          name="radios-tool-length"
        ></b-form-radio-group>
      </div>

      <div v-if="filters.mainUsage" class="f-group">
        <!-- <h4 class="f-label">Применение</h4> -->
        <b-form-select v-model="selected.mainUsage">
          <b-form-select-option :value="null" disabled>— Основное применение —</b-form-select-option>
          <b-form-select-option value="p">
            <span class="mat-chip-sm mat-main mat-p"></span>Углеродистая и легированная сталь
          </b-form-select-option>
          <b-form-select-option value="k">Чугун</b-form-select-option>
          <b-form-select-option value="m">Нержавеющая сталь</b-form-select-option>
          <b-form-select-option :value="['h', 'h1.1', 'h1.2']">Закаленная сталь</b-form-select-option>
          <b-form-select-option :value="['n', 'n1', 'n3']">Цветные металлы</b-form-select-option>
          <b-form-select-option value="s">Суперсплавы и титан (жаропрочные сплавы)</b-form-select-option>
        </b-form-select>
      </div>

      <div class="breaker"></div>

      <div v-if="filters.cuttingPartLength" class="f-group">
        <h4 class="f-label">Длина режущей части</h4>
        <b-form-radio-group
          id="radios-coating"
          v-model="selected.cuttingPartLength"
          :options="filters.cuttingPartLength.list"
          buttons
          button-variant="outline-secondary"
          name="radios-coating"
        ></b-form-radio-group>
      </div>

      <div v-if="filters.cuttingFluid" class="f-group">
        <h4 class="f-label">Подвод СОЖ</h4>
        <b-form-radio-group
          id="radios-cutting-fluid"
          v-model="selected.cuttingFluid"
          :options="filters.cuttingFluid.list"
          buttons
          button-variant="outline-secondary"
          name="radios-cutting-fluid"
        ></b-form-radio-group>
      </div>

      <div v-if="filters.coating" class="f-group">
        <h4 class="f-label">Покрытие</h4>
        <b-form-radio-group
          id="radios-coating"
          v-model="selected.coating"
          :options="filters.coating.list"
          buttons
          button-variant="outline-secondary"
          name="radios-coating"
        ></b-form-radio-group>
      </div>

      <div v-show="filterEnabled" @click="resetFilters" class="f-reset">Сбросить фильтры</div>
    </div>

    <div class="output">
      <div class="thead" v-if="seriesComponent === 'SeriesItem'">
        <div class="flex-row-nowrap">
          <div class="sticky-th" style="flex: 1 1 34%">Серия</div>
          <div class="sticky-th" style="flex: 1 1 15%">Основное применение</div>
          <div class="sticky-th" style="flex: 1 1 15%">Возможное применение</div>
          <div class="sticky-th" style="flex: 1 1 36%">Покрытие, зубья и пр.</div>
        </div>
      </div>
      <div class="tbody">
        <div v-for="(group, gIndex) in output" :key="gIndex">
          <h4 v-if="group.title" class="group-label">{{ group.title }}</h4>
          <component :is="seriesComponent" v-for="node in group.nodes" :node="node" :key="node.id" />
        </div>

        <!-- <series-item v-for="item in output" :node="item.node" :key="item.id" /> -->

        <div v-if="output.length === 0" class="td-empty">
          Мы можем изготовить инструмент с индивидуальными параметрами. Перейдите в раздел
          <g-link to="/catalog/special/">специального инструмента</g-link>.
        </div>
      </div>
    </div>
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
}
</static-query>

<script>
import SeriesItem from '~/components/catalog/SeriesTableItem.vue'
import SeriesCard from '~/components/catalog/SeriesCard.vue'
import FilterTypesList from '~/components/catalog/FilterTypesList.vue'
import { BFormRadioGroup, BFormSelect, BFormSelectOption } from 'bootstrap-vue'

export default {
  components: {
    SeriesItem,
    SeriesCard,
    FilterTypesList,
    BFormRadioGroup,
    BFormSelect,
    BFormSelectOption,
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
      typesWithFilters: [null, 'end-mills', 'drills-spiral'],
      selected: {
        type: this.$route.query.type || null,
        endShapes: null,
        toolLength: null,
        coating: null,
        mainUsage: null,
        cuttingPartLength: null,
        cuttingFluid: null,
      },
    }
  },

  computed: {
    filterEnabled() {
      return Object.keys(this.selected).some(
        (key) => this.selected[key] !== null
      )
    },

    outputFiltered() {
      // Use filters with selected values only
      const filterKeys = this.filters
        ? Object.keys(this.selected).filter((filter) => this.selected[filter])
        : []

      return this.nodes.filter(({ node }) => {
        for (const filterKey of filterKeys) {
          // If series value is array try to find item in it
          if (Array.isArray(node[filterKey])) {
            // If field is array filter can hold multiple variants too
            // we should convert value to array
            const value = Array.isArray(this.selected[filterKey])
              ? this.selected[filterKey]
              : [this.selected[filterKey]]

            if (
              !value.some(
                (selectedVariant) =>
                  node[filterKey].indexOf(selectedVariant) >= 0
              )
            )
              return false
          } else {
            if (node[filterKey] !== this.selected[filterKey]) {
              return false
            }
          }
          // If the node meets the criteria then we should check for the rest of conditions.
        }

        return true
      })
    },

    seriesComponent() {
      return this.outputFiltered.length > 6 ? 'SeriesItem' : 'SeriesCard'
    },

    output() {
      // Group nodes by given value
      return this.outputFiltered.reduce((acc, item) => {
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
      this.selected = {
        type: this.$route.query.type || null,
        endShapes: null,
        toolLength: null,
        coating: null,
        mainUsage: null,
        cuttingPartLength: null,
        cuttingFluid: null,
      }
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
  font-weight: 400;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-top: 1.75rem;
}

.sticky-th {
  padding: 0.5rem 0.5rem;
}

.thead,
.tbody {
  width: 100%;
}

.thead {
  position: sticky;
  top: -1px;
  font-weight: 700;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none; // Hide it on moblie, but display on desktop
  box-shadow: 0 20px 20px -12px rgba(0, 0, 0, 0.06);
  margin-bottom: 0.75rem;
}

.td-empty {
  width: 100%;
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
  width: 100%;
  height: 0;
}

.f-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  margin-right: 2.5rem;
}

.f-label {
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
