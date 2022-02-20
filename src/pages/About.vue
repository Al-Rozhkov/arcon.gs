<template>
  <Layout>
    <main class="container">
      <h1>{{ $page.page.title }}</h1>

      <div class="text-body" v-html="$page.page.content"></div>

      <section class="pt">
        <h2 class="mb-2">
          <g-link to="/news/">{{ $page.newsTitle.value }}</g-link>
        </h2>

        <front-news />
      </section>
    </main>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "about") {
    id
    title
    description
    content
  }
  newsTitle: t(id: "headline.news") {
    value
  }
}
</page-query>

<script>
import FrontNews from '~/components/blocks/FrontNews.vue'

export default {
  components: {
    FrontNews
  },

  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page.excerpt,
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
