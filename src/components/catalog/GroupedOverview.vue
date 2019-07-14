<template>
  <div class="grouped-overview">
    <div v-if="filters" class="filters py-sm">
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
        <b-form-select v-model="selected.usage">
          <option :value="null" disabled>Основное применение</option>
          <option value="p">
            <span class="mat-chip-sm mat-main mat-p"></span>Углеродистая и легированная сталь
          </option>
          <option value="k">Чугун</option>
          <option value="m">Нержавеющая сталь</option>
          <option value="h">Закаленная сталь</option>
          <option value="n">Цветные металлы</option>
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
    <div class="overflow-x-auto">
      <table class="output sticky-header">
        <thead>
          <tr>
            <th>Серия</th>
            <th>Основное применение</th>
            <th>Возможное применение</th>
            <th colspan="3">Покрытие, зубья</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(group, gIndex) in groups">
            <tr :key="`tr-${gIndex}`">
              <td colspan="6" class="group-label">{{ group.label }}</td>
            </tr>
            <series-item
              v-for="item in output[group.name]"
              :node="$page.series.edges[item].node"
              :key="`${group.name}-${item}`"
            />
          </template>
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
        endShapes: '',
        coating: '',
        usage: null,
        cuttingPartLength: ''
      }
    }
  },

  computed: {
    output() {
      const all = this.$page.series.edges

      /*
      filter: {
        trait: 'endShapes'
        value: ['rect-sharp', 'rect-r', 'rect-f']
      }
      */
      const filterCondition = () => {}

      const result = {}
      for (let i = 0, len = all.length; i < len; i++) {
        all[i].node.cuttingPartLength.forEach(element => {
          ;(result[element] = result[element] || []).push(i)
        })
      }

      return result
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

.filters {
  display: flex;
  flex-wrap: wrap;
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
</style>
