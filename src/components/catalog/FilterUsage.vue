<template>
  <b-form-select :value="value" @input="$emit('input', $event)">
    <select-option :value="null" disabled>{{
      $static.tMatPlaceholder.value
    }}</select-option>
    <select-option value="p">{{ $static.tMatSteel.value }}</select-option>
    <select-option value="k">{{ $static.tMatCastIron.value }}</select-option>
    <select-option value="m">{{
      $static.tMatStainlessSteel.value
    }}</select-option>
    <select-option :value="['h', 'h1.1', 'h1.2']">{{
      $static.tMatHardnedSteel.value
    }}</select-option>
    <select-option :value="['n', 'n1', 'n3']">{{
      $static.tMatNonFerrousMetals.value
    }}</select-option>
    <select-option value="s">{{ $static.tMatTitan.value }}</select-option>
  </b-form-select>
</template>

<static-query>
query ProductFilters {
  tMatPlaceholder: t(id: "catalog.filters.mat-placeholder") {
    value
  }
  tMatSteel: t(id: "catalog.filters.mat-steel") {
    value
  }
  tMatCastIron: t(id: "catalog.filters.mat-cast-iron") {
    value
  }
  tMatStainlessSteel: t(id: "catalog.filters.mat-stainless-steel") {
    value
  }
  tMatHardnedSteel: t(id: "catalog.filters.mat-hardened-steel") {
    value
  }
  tMatNonFerrousMetals: t(id: "catalog.filters.mat-non-ferrous-metals") {
    value
  }
  tMatTitan: t(id: "catalog.filters.mat-titan") {
    value
  }
}
</static-query>

<script>
// @todo Use graphql for material options.
import { BFormSelect, BFormSelectOption as SelectOption } from 'bootstrap-vue'

export default {
  components: { BFormSelect, SelectOption },
  props: ['value'],
}
</script>