<template>
  <g-link class="a" :to="node.path">
    <figure v-if="node.image" class="figure">
      <g-image :src="node.image" :immediate="false" />
    </figure>
    <small class="date">{{ node.date }}</small>
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
.a {
  display: block;
  cursor: pointer;

  &:hover {
    .figure {
      border: 1px solid lighten($red, 10%);
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
  text-rendering: optimizeLegibility;
}

.figure {
  border-radius: 6px;
  border: 1px solid $gray-300;
  max-width: 275px;
  position: relative;
  overflow: hidden;
}

.date {
  display: block;
  color: $gray-600;
  margin-bottom: .5rem;
}
</style>