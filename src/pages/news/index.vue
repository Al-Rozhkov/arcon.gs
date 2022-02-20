<template>
  <Layout>
    <main class="cnt">
      <h1>{{ $page.newsTitle.value }}</h1>
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
  news: allNews(filter: { nopage: { ne: true }}, limit: 36, sortBy: "date", order: DESC) {
    edges{
      node {
        id
        path
        content
        title
        localeDate
        image(width: 275, height: 160, fit: contain, background: "#ffffff", quality: 100)
      }
    }
  }
  newsTitle: t(id: "headline.news") {
    value
  }
}
</page-query>

<script>
import NewsTeaser from '~/components/NewsTeaser.vue'

export default {
  components: {
    NewsTeaser,
  },

  metaInfo() {
    return {
      title: this.$page.newsTitle.value,
    }
  },
}
</script>

<style lang="scss" scoped>
.news-page {
  display: flex;
  flex-wrap: wrap;
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
