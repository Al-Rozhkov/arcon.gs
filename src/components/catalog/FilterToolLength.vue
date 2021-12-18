<template>
  <b-form-radio-group
    id="radios-tool-length"
    :checked="value"
    :options="options"
    @input="$emit('input', $event)"
    buttons
    button-variant="outline-secondary"
    name="radios-tool-length"
  ></b-form-radio-group>
</template>

<static-query>
query {
  tAny: t(id: "catalog.filters.any-f") {
    value
  }
  options: allParamToolLength {
    edges {
      node {
        value
        text
      }
    }
  }
}
</static-query>

<script>
import { BFormRadioGroup } from 'bootstrap-vue'
export default {
  components: {
    BFormRadioGroup,
  },

  props: ['value'],

  computed: {
    options() {
      return [
        {
          text: this.$static.tAny.value,
          value: null,
        },
        ...this.$static.options.edges.map(({ node }) => node),
      ]
    },
  },
}
</script>