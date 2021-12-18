<template>
  <span v-tooltip="tooltipText" :class="matClass">{{ matId }}</span>
</template>

<static-query>
query {
  options: allParamMatGroup {
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
export default {
  props: {
    matId: {
      type: String,
      required: true,
    },
    matMain: {
      type: Boolean,
      default: true,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    tooltipText() {
      if (!this.showTooltip) return false
      const { node } = this.$static.options.edges.find(
        ({ node }) => node.id === this.matId
      )
      return node ? node.text : false
    },
    matClass() {
      const usageType = this.matMain ? 'mat-main' : 'mat-possible'
      return `mat-chip ${usageType} mat-${this.matId.charAt(0)}`
    },
  },
}
</script>
