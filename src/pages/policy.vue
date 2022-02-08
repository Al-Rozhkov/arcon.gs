<template>
  <Layout>
    <header class="pt bg-gray-100">
      <div class="container-xl">
        <h1>{{ $page.page.title }}</h1>

        <ul class="menu submenu">
          <app-menu-item
            v-for="item in $page.page.headings.filter(h => h.depth == 2)"
            :key="item.anchor"
            :to="$route.path + item.anchor"
          >{{ item.value }}</app-menu-item>
        </ul>
      </div>
    </header>

    <article class="cnt" v-html="$page.page.content"></article>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "policy") {
    id
    title
    headings {
      depth
      value
      anchor
    }
    excerpt
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
