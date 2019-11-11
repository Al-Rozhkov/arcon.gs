<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 14 24"
    xmlns="http://www.w3.org/2000/svg"
    ratio="1"
  >
    <polyline fill="none" :stroke="color" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 " />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 25
    },
    color: {
      type: String,
      default: '#000000'
    }
  }
}
</script>
