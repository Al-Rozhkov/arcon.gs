<template>
  <b-form-radio-group
    id="radios-end-shape"
    :checked="value"
    :options="options"
    @input="$emit('input', $event)"
    buttons
    button-variant="outline-secondary"
    name="radios-end-shape"
  ></b-form-radio-group>
</template>

<static-query>
query {
  tAny: t(id: "catalog.filters.any-f") {
    value
  }
  options: allParamEndShape {
    edges {
      node {
        id
        text
        group
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
      return this.$static.options.edges.reduce(
        (acc, { node }) => {
          const itemIndex = acc.findIndex(item => item.text === node.group)

          if (itemIndex === -1) {
            acc.push({
              value: [node.id],
              text: node.group
            })
          } else {
            acc[itemIndex].value.push(node.id)
          }

          return acc
        },
        [
          {
            text: this.$static.tAny.value,
            value: null,
          },
        ]
      )
    },
  },
}
</script>