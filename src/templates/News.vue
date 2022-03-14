<template>
  <page-layout>
    <p><g-link to="/news/">← {{ $page.cNews.value }}</g-link></p>
    <h1>{{ $page.node.title }}</h1>

    <figure v-if="$page.node.image">
      <g-image :src="$page.node.image" />
    </figure>
    <div class="page-content" v-html="$page.node.content"></div>
  </page-layout>
</template>

<page-query>
query News($path: String) {
  node: news(path: $path) {
    id
    path
    content
    excerpt
    title
    image(width: 660, quality: 100)
  }
  cNews: t(id: "headline.news-back") {
    value
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/NewsSection.vue'

export default {
  components: {
    PageLayout
  },

  metaInfo() {
    return {
      title: this.$page.node.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.node.excerpt,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.node.title,
        },
      ],
    }
  }
}
</script>
