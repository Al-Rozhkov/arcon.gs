<template functional>
  <ul class="menu" :class="[ { 'menu--vertical': props.vertical}, data.staticClass ]">
    <slot />
  </ul>
</template>

<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
