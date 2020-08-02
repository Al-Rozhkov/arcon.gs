<template functional>
  <li class="li">
    <g-link :to="props.to" class="a">
      <span class="u" v-bind:class="{bold: props.bold}">
        <slot />
      </span>
    </g-link>
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },

    bold: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.li {
  padding: 0.3rem 1rem 0.3rem 0;
}

.a {
  display: block;
}

.a:hover span.u {
  color: $link-hover-color;
  border-bottom: 1px solid $red;
}

span.u {
  border-bottom: 1px solid rgba($cyan, 0.25);
}

.active {
  color: $red;
}

a.active--exact,
a.active--exact:hover {
  color: $red;
  cursor: default;

  span.u {
    color: $red;
    border: 0;
  }
}

.bold {
  font-weight: 700;
}
</style>
