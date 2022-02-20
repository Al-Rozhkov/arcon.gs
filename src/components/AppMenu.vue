<template functional>
  <ul class="menu" :class="[ { v: props.vertical}, data.staticClass ]">
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

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-wrap: wrap;

  list-style-type: none;
  padding: 0;
}

.v {
  flex-direction: column;
}
</style>
