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
h1 {
  margin-bottom: 3rem;
}

.news-page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
  margin-bottom: 40px;
}

.col {
  margin-bottom: 2rem;
}

@include media-breakpoint-up(md) {
  .news-page {
    gap: 30px;
  }

  .col {
    grid-column: span 6;
  }
}
@include media-breakpoint-up(lg) {
  .col {
    grid-column: span 3;
  }
}
</style>
