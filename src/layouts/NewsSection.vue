<template>
  <div class="layout">
    <div class="cnt">
      <div class="tile-row">
        <main class="col news-page-body">
          <slot />
        </main>

        <aside class="col news-page-aside">
          <div v-for="(node, index) in $static.news.edges" :key="index" class="mb-3">
            <template v-if="!node.node.nopage">
              <g-link :to="node.node.path">
                <figure v-if="node.node.image">
                  <g-image :src="node.node.image" />
                </figure>
                <h3 class="news-title">{{ node.node.title }}</h3>
              </g-link>
            </template>

            <template v-else>
              <h3>{{ node.node.title }}</h3>
              <div v-html="node.node.content" />
            </template>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<static-query>
query RecentNews {
  news: allNews(limit: 4) {
    edges{
      node {
        id
        path
        nopage
        content
        title
        image(width: 255, height: 150)
      }
    }
  }
}
</static-query>

<style lang="scss">
.news-page-body {
  li {
    margin-bottom: 0.5rem;
  }

  img {
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.news-title {
  font-weight: $font-weight-base;
  color: #000000;
}

@include media-breakpoint-up(lg) {
  .news-page-body {
    @include make-col(16);
    padding-right: 60px;
  }

  .news-page-aside {
    @include make-col(8);
  }
}
</style>
