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
    edges {
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
  color: $black;
  cursor: pointer;

  &:hover {
    background-color: lighten($yellow, 35%) ;

    .u {
      color: #000000;
      border-bottom: 0;
    }
  }
}

.u {
  @include link-underline();
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
