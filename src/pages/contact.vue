<template>
  <Layout>
    <div class="contact-page">
      <main class="container">
        <h1 class="page-title">{{ $page.page.title }}</h1>

        <div class="page-content" v-html="$page.page.content"></div>
      </main>

      <arconit-symbol class="arconit-symbol" />
    </div>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "contact") {
    id
    title
    description
    content
  }
}
</page-query>

<script>
import ArconitSymbol from '@/components/ArconitSymbol.vue'

export default {
  components: {
    ArconitSymbol,
  },

  metaInfo() {
    return {
      title: this.$page.page.title,
      titleTemplate: null,
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

<style lang="scss" scoped>
.contact-page {
  position: relative;
  overflow: hidden;
}

.arconit-symbol {
  position: absolute;
  width: 65%;
  top: 10%;
  left: 45%;
  opacity: 0.1;
}
</style>
