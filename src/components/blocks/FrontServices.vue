<template>
  <div class="tile-row services-teasers" v-once>
    <g-link
      v-for="{ node } in $static.services.edges"
      :key="node.id"
      :to="node.path"
      class="col s"
    >
      <h3 class="h3">
        <span class="u">{{ node.title }}</span>
      </h3>
      <p v-html="node.teaser"></p>
    </g-link>
  </div>
</template>

<static-query>
query Services {
  services: allService(sortBy: "weight", order: ASC) {
    edges{
      node {
        id
        path
        title
        teaser
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.h3 {
  margin-top: 0;
  font-weight: $font-weight-base;
}

.s {
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 0.75rem;
  background-color: #ffffff;
  border: 2px solid transparent;
  color: $black;
  cursor: pointer;

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    opacity: 0.25;
    z-index: 10;
  }

  &:hover {
    background-color: lighten($yellow, 35%) ;

    &::after {
      opacity: 0.7;
    }

    .u {
      color: #000000;
      border-bottom: 0;
    }
  }
}

.u {
  color: $cyan;
  border-bottom: 1px solid rgba($cyan, 0.2);
}

@include media-breakpoint-up(lg) {
  .h3 {
    font-size: 1.5rem;
  }

  .s {
    @include make-col(8);
    min-height: 220px;
  }
}
</style>
