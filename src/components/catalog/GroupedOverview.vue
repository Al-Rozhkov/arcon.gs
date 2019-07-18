<template>
  <div class="grouped-overview">
    <div v-if="filters" class="filters py-sm">
      <div
        v-if="filterEnabled"
        @click="resetFilters"
        class="f-reset"
      >Сбросить фильтры</div>
      
      <div class="f-group">
        <h4 class="f-label">Форма торца</h4>
        <b-form-radio-group
          id="radios-end-shapes"
          v-model="selected.endShapes"
          :options="filterTrait.endShapes.list"
          buttons
          button-variant="outline-secondary"
          name="radios-end-shapes"
        ></b-form-radio-group>
      </div>

      <div class="f-group">
        <!-- <h4 class="f-label">Применение</h4> -->
        <b-form-select v-model="selected.mainUsage">
          <option :value="null" disabled>Основное применение</option>
          <option value="p">
            <span class="mat-chip-sm mat-main mat-p"></span>Углеродистая и легированная сталь
          </option>
          <option value="k">Чугун</option>
          <option value="m">Нержавеющая сталь</option>
          <option :value="{ value: ['h', 'h1.1', 'h1.2']}">Закаленная сталь</option>
          <option :value="{ value: ['n', 'n1', 'n3']}">Цветные металлы</option>
          <option value="s">Суперсплавы и титан (жаропрочные сплавы)</option>
        </b-form-select>
      </div>
      <div class="f-group">
        <h4 class="f-label">Длина режущей части</h4>
        <b-form-radio-group
          id="radios-coating"
          v-model="selected.cuttingPartLength"
          :options="filterTrait.cuttingPartLength.list"
          buttons
          button-variant="outline-secondary"
          name="radios-coating"
        ></b-form-radio-group>
      </div>
      <div class="f-group">
        <h4 class="f-label">Покрытие</h4>
        <b-form-radio-group
          id="radios-coating"
          v-model="selected.coating"
          :options="filterTrait.coating.list"
          buttons
          button-variant="outline-secondary"
          name="radios-coating"
        ></b-form-radio-group>
      </div>
    </div>
    <div>
      <table class="output sticky-header">
        <thead>
          <tr>
            <th class="sticky-th">Серия</th>
            <th class="sticky-th">Основное применение</th>
            <th class="sticky-th">Возможное применение</th>
            <th class="sticky-th" colspan="3">Покрытие, зубья</th>
          </tr>
        </thead>
        <tbody>
          <!-- <template v-for="(group, gIndex) in groups">
            <tr :key="`tr-${gIndex}`">
              <td colspan="6" class="group-label">{{ group.label }}</td>
            </tr>
            <series-item
              v-for="item in output[group.name]"
              :node="$page.series.edges[item].node"
              :key="`${group.name}-${item}`"
            />
          </template>-->
          <series-item v-for="item in output" :node="item.node" :key="item.id" />

          <tr v-if="output.length === 0">
            <td class="td-empty" colspan="6">
              Мы можем изготовить инструмент с индивидуальными параметрами. Перейдите в раздел <g-link to="/constructor">конструктор</g-link>.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SeriesItem from '~/components/catalog/SeriesTableItem.vue'
import { BFormRadioGroup, BFormSelect } from 'bootstrap-vue'
import filterTrait from '~/utils/filterTrait.js'

export default {
  components: {
    SeriesItem,
    BFormRadioGroup,
    BFormSelect
  },

  props: {
    filters: {
      type: Boolean,
      default: false
    },
    groups: {
      type: Array
    }
  },

  data() {
    return {
      filterTrait,
      selected: {
        endShapes: null,
        coating: null,
        mainUsage: null,
        cuttingPartLength: null
      }
    }
  },

  computed: {
    filterEnabled() {
      return !!(this.selected.endShapes || this.selected.coating || this.selected.mainUsage || this.selected.cuttingPartLength)
    },
    
    output() {
      const all = this.$page.series.edges

      const filterCondition = seriesItem => {
        if (!this.filters) return true

        const filterKeys = Object.keys(this.selected)
        for (let f = 0, fl = filterKeys.length; f < fl; f++) {
          const filterKey = filterKeys[f]
          const filterValue = this.selected[filterKey]

          // If filter has value
          if (!!filterValue) {
            // Convert selected value to array
            // console.log(filterKey, filterValue, seriesItem[filterKey])
            
            // If series value is array try to find item in it
            if (Array.isArray(seriesItem[filterKey])) {
              const value = (typeof filterValue === 'object')
              ? this.selected[filterKey].value
              : [this.selected[filterKey]]
              
              if (!value.some(r => seriesItem[filterKey].indexOf(r) >= 0)) return false
            } else {
              if (seriesItem[filterKey].indexOf(filterValue) === -1) return false
            }
          }
        }
        
        return true
      }

      const result = []
      for (let i = 0, len = all.length; i < len; i++) {
        /* all[i].node.cuttingPartLength.forEach(element => {
          ;(result[element] = result[element] || []).push(i)
        }) */
        if (filterCondition(all[i].node)) {
          result.push(all[i])
        }
      }

      return result
    }
  },

  methods: {
    resetFilters() {
      this.selected = {
        endShapes: null,
        coating: null,
        mainUsage: null,
        cuttingPartLength: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modules/table.scss';

.output {
  margin: 0 -0.5rem;
}

td.group-label {
  padding: 1.8rem 0.5rem 0.5rem;
}

td.td-empty {
  padding: 2rem 0.5rem;
  font-size: 1.25rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.f-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  margin-right: 2rem;
}

.f-label {
  font-weight: $font-weight-base;
  padding: $btn-padding-y 0.75rem $btn-padding-y 0;
  margin: 0;
}

.f-reset {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  color: $blue;
  cursor: pointer;
}
</style>
