<template>
  <span v-tooltip="matDesc" :class="matClass">{{ matId }}</span>
</template>

<script>
import { materials } from '~/utils/fieldsMapping.js'

export default {
  props: {
    matId: {
      type: String,
      required: true
    },
    matMain: {
      type: Boolean,
      default: true
    },
    showTooltip: {
      type: Boolean,
      default: true
    }
  },

  data: () => {
    return {
      materialDesc: materials
    }
  },

  computed: {
    matDesc() {
      return this.showTooltip ? this.materialDesc[this.matId] : false
    },
    matClass() {
      const usageType = this.matMain ? 'mat-main' : 'mat-possible'
      return `mat-chip ${usageType} mat-${this.matId.charAt(0)}`
    }
  }
}
</script>
