<template>
  <svg :width="width" :height="height">
    <use :xlink:href="'#' + iconId" />
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    iconId: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: 50
    },

    height: {
      type: Number,
      default: 50
    }
  }
}
</script>
