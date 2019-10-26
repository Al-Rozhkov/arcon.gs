<template>
  <div class="layout">
    <div class="cnt">
      <div class="tile-row">
        <main class="col news-page-body">
          <slot />
        </main>

        <aside class="col news-page-aside">
          <div class="mb-3">
            <h3>Металлообработка 2019</h3>
            <p>Приглашаем посетить наш стенд на 20-й международной специализированной выставке в «Экспоцентре» на Краснопресненской набережной.</p>
            <p>Стенд 24B70 (Павильон №2, зал 4).</p>
          </div>
          <div
            v-for="(node, index) in $static.news.edges"
            :key="index"
            class="mb-3"
          >
            <g-link :to="node.node.path">
              <figure>
                <g-image :src="node.node.image" />
              </figure>
              <h3 class="news-title">{{ node.node.title }}</h3>
            </g-link>
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
        excerpt
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
