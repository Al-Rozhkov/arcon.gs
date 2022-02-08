<template>
  <div class="list-group">
    <g-link
      v-for="result in preparedResults"
      :key="result.id"
      :to="result.path"
      class="list-group-item list-group-item-action"
    >
      <h3>
        {{ result.title }}
        <!-- <span class="badge">{{ getLabel(result.index) }}</span> -->
      </h3>
      <div v-if="result.description">
        {{ result.description }}
      </div>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    nodes: {
      type: Array,
      required: true,
    },
  },

  computed: {
    preparedResults() {
      return this.nodes.reduce((acc, field) => {
        for (const doc of field.result) {
          if (!acc[doc.id]) {
            acc[doc.id] = {
              ...doc.doc,
              id: doc.id,
            }
          }
        }
        return acc
      }, {})
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/../node_modules/bootstrap/scss/list-group';

.badge {
  display: inline-block;
  padding: $badge-padding-y $badge-pill-padding-x;
  @include font-size($badge-font-size);
  font-weight: $badge-font-weight;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  @include transition($badge-transition);
  @include border-radius($badge-pill-border-radius);

  @at-root a#{&} {
    @include hover-focus() {
      text-decoration: none;
    }
  }

  // Empty badges collapse automatically
  &:empty {
    display: none;
  }

  color: $gray-700;
  background-color: $gray-200;
}
</style>