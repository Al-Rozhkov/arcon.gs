<template>
  <b-form-select @change="goTo" :options="options" :value="value" />
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
import { BFormSelect, BFormSelectOption } from 'bootstrap-vue'

export default {
  components: {
    BFormSelect,
    BFormSelectOption
  },

  props: {
    value: {
      type: String
    }
  },

  computed: {
    options() {
      return [
        {
          text: '— Все инструменты —',
          value: null
        },
        ...this.$static.types.edges.map(({ node }) => ({
          text: node.title,
          value: node.id
        }))
      ]
    }
  },

  methods: {
    goTo(id) {
      this.$emit('input', id)
      const typeObject = this.$static.types.edges.find(n => n.node.id === id)
      if (typeObject) {
        this.$router.push({
          path: `/catalog/${typeObject.node.type}`,
          query: {
            type: id
          }
        })
      } else {
        this.$router.push('/catalog')
      }
    }
  }
}
</script>
