<template>
  <Layout>
    <main class="cnt">
      <h1>Новости компании</h1>
      <div class="news-page">
        <div v-for="(node, index) in $page.news.edges" :key="index" class="col">
          <news-teaser :node="node.node" />
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query RecentNews {
  news: allNews(filter: { nopage: { ne: true }}, limit: 24, sortBy: "date") {
    edges{
      node {
        id
        path
        content
        title
        image(width: 275, height: 160)
      }
    }
  }
}
</page-query>

<script>
import NewsTeaser from '~/components/NewsTeaser.vue'

export default {
  components: {
    NewsTeaser
  },

  metaInfo: {
    title: 'Новости компании'
  }
}
</script>

<style lang="scss" scoped>
.news-page {
  @extend %grid-row-wrap;
  @include make-grid-gutter();
  margin-bottom: 40px;
}

.col {
  margin-bottom: 3rem;
}

@include media-breakpoint-up(md) {
  .col {
    @include make-col(12);
  }
}
@include media-breakpoint-up(lg) {
  .col {
    @include make-col(6);
  }
}
</style>
