<template>
  <page-layout>
    <h1>{{ $page.node.title }}</h1>

    <figure>
      <g-image :src="$page.node.image" />
    </figure>
    <div class="text-body" v-html="$page.node.content"></div>
  </page-layout>
</template>

<page-query>
  query News ($path: String) {
    node: news (path: $path) {
      id
      path
      content
      title
      image(width: 660)
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
      title: this.$page.title
    }
  }
}
</script>
