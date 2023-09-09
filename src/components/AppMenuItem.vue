<template functional>
  <li>
    <g-link :to="props.to" class="menu-link">
      <span class="menu-link__u" v-bind:class="{ bold: props.bold }">
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
      required: true,
    },

    bold: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
