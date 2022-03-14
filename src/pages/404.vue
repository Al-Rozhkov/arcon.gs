<template>
  <Layout>
    <main class="container">
      <h1>{{ $page.page.title }}</h1>

      <div class="flex-row page-content">
        <div class="col-lg-16" v-html="$page.page.content"></div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "404") {
    id
    title
    description
    content
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
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
