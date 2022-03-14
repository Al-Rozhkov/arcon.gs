<template>
  <Layout>
    <main class="container">
      <h1 class="page-title">{{ $page.page.title }}</h1>

      <section class="tile-root">
        <div class="tile-row">
          <g-link
            v-for="({ node }, index) in $page.tech.edges"
            :key="node.id"
            :to="`/tech#article-${index}`"
            class="col"
            :class="`weight${node.weight}`"
          >
            <h2 class="h2">{{ node.title }}</h2>
            <g-image :src="node.image" class="image-cover"></g-image>
          </g-link>
        </div>
      </section>

      <section class="tile-row sticky-sidebar pb">
        <aside class="col-md-6 aside">
          <app-menu vertical>
            <app-menu-item
              v-for="({ node }, index) in $page.tech.edges"
              :key="node.id"
              :to="`/tech#article-${index}`"
              >{{ node.title }}</app-menu-item
            >
          </app-menu>
        </aside>

        <div class="col-md-18 page-content pb">
          <section
            v-for="({ node }, index) in $page.tech.edges"
            :key="node.id"
            :id="`article-${index}`"
            class="pb"
          >
            <h2>{{ node.title }}</h2>

            <article v-html="node.content"></article>
          </section>
        </div>
      </section>
    </main>
  </Layout>
</template>

<page-query>
query Tech {
  page: mdPage(id: "tech") {
    title
    description
  }
  tech: allTech(sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        title
        content
        image
        weight
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.page.title,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.tile-root {
  margin-bottom: 120px;
}

.h2 {
  font-weight: $font-weight-base;
}

.p {
  max-width: 460px;
}

.h2,
.p {
  position: relative;
  z-index: 20;
}

.col {
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: gray('100');
  border: 2px solid $white;
  min-height: 200px;
  color: $black;
  cursor: pointer;
  overflow: hidden;

  .image-cover {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    opacity: 0.25;
    z-index: 10;
    transition: opacity 0.5s ease-out;
  }

  &:hover .image-cover {
    opacity: 0.7;
  }
}

.sticky-sidebar {
  align-items: flex-start;
}

@include media-breakpoint-up(md) {
  .aside {
    @supports (position: sticky) {
      position: sticky;
      top: 2rem;
      z-index: $zindex-sticky;
    }
  }

  .col-md-6 {
    @include make-col(6);
  }

  .col-md-18 {
    @include make-col(18);
  }
}

@include media-breakpoint-up(lg) {
  .weight1 {
    @include make-col(9);
  }

  .weight2 {
    @include make-col(15);
  }

  .weight3 {
    @include make-col(11);
  }

  .weight4 {
    @include make-col(13);
  }
}
</style>
