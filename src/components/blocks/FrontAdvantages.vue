<template>
  <section class="tile-row" v-once>
    <g-link
      v-for="{ node } in $static.nodes.edges"
      :key="node.id"
      :to="node.link"
      class="col"
    >
      <div>
        <h3 class="h3" v-html="node.title"></h3>
        <p v-html="node.text"></p>
      </div>
      <div :class="node.class">
        <g-image class="img" :src="node.image" />
      </div>
    </g-link>
  </section>
</template>

<static-query>
query {
  nodes: allAdvantage(sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        title
        link
        text
        class
        image(width: 520, quality: 100)
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.h3 {
  padding-top: 1.75rem;
}

.col {
  position: relative;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid $gray-100;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    .img {
      transform: scale(1.03, 1.03);
    }
  }

  .img {
    transition: transform .2s ease 0s;
  }
}

// Stick to top
.align-to-top {
  order: -1;
  align-self: flex-start;
  margin-top: 0;
  margin-bottom: auto;
}
// Stick to bottom
.align-to-bottom {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 0;
}
// Stick to right
.align-to-right {
  margin-left: auto;
  margin-right: -15px;
}

@include media-breakpoint-up(sm) {
  .align-to-right {
    margin-right: -30px;
  }

  .col {
    @include make-col(12);
  }
}

@include media-breakpoint-up(lg) {
  .col {
    @include make-col(8);
  }
}
</style>
