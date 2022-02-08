<template>
  <b-form-radio-group
    id="radios-coating"
    :checked="value"
    :options="options"
    @input="$emit('input', $event)"
    buttons
    button-variant="outline-secondary"
    name="radios-coating"
  ></b-form-radio-group>
</template>

<static-query>
query {
  tAny: t(id: "catalog.filters.any-n") {
    value
  }
  options: allParamCoating {
    edges {
      node {
        id
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
        ...this.$static.options.edges.map(({ node }) => ({
          value: node.id,
          text: node.text
        })),
      ]
    },
  },
}
</script>