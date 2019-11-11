<template>
  <g-link class="a" :to="node.path">
    <figure v-if="node.image" class="figure">
      <g-image :src="node.image" />
    </figure>
    <h3 class="h3">{{ node.title }}</h3>
  </g-link>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
a.a {
  display: block;
  cursor: pointer;

  &:hover {
    .figure {
      @include box-shadow(0 0 30px rgba(0, 0, 0, 0.2));
    }

    .h3 {
      color: $red;
    }
  }
}

.h3 {
  font-size: 1rem;
  font-weight: $font-weight-base;
  color: $black;
}

.figure {
  border-radius: 6px;
  max-width: 275px;
  position: relative;
  overflow: hidden;
  @include box-shadow(0 0 20px rgba(0, 0, 0, 0.15));
}
</style>