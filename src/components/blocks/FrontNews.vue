<template>
  <section class="news-teasers" v-once>
    <div
      v-for="(node, index) in $static.news.edges"
      :key="index"
      class="col"
    >
      <g-link class="a" :to="node.node.path">
        <figure v-if="node.node.image" class="figure">
          <g-image :src="node.node.image" />
        </figure>
        <h3 class="h3">{{ node.node.title }}</h3>
      </g-link>
    </div>

    <div class="col">
      <h3 class="h2">Металлообработка 2019</h3>
      <p>Приглашаем посетить наш стенд на 20-й международной специализированной выставке в «Экспоцентре» на Краснопресненской набережной.</p>
      <p>Стенд 24B70 (Павильон №2, зал 4).</p>
    </div>
  </section>
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

<style lang="scss" scoped>
.news-teasers {
  @extend %grid-row-wrap;
  @include make-grid-gutter();
  margin-bottom: 40px;
}

.col {
  margin-bottom: 2rem;
}

@include media-breakpoint-up(md) {
  .news-teasers {
    margin-bottom: 4rem;
  }

  .col {
    @include make-col(12);
  }
}

@include media-breakpoint-up(lg) {
  .news-teasers {
    margin-bottom: 6rem;
  }

  .col {
    @include make-col(6);
  }
}

a.a {
  display: block;
  cursor: pointer;

  &:hover {
    .figure {
      @include box-shadow(0 0 30px rgba(0, 0, 0, 0.2));
    }

    .h3 {
      color: $red;
    }
  }
}

.h3 {
  font-size: 1rem;
  font-weight: $font-weight-base;
}

.h2 {
  font-size: 1.7rem;
  font-weight: $font-weight-base;
}

.h3, .h2 {
  color: $black;
}

.figure {
  border-radius: 6px;
  max-width: 255px;
  position: relative;
  overflow: hidden;
  @include box-shadow(0 0 20px rgba(0, 0, 0, 0.15));
}
</style>
