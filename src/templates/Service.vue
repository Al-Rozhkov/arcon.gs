<template>
  <Layout>
    <template #submenu>
      <menu-services class="submenu" />
    </template>

    <LazyHydrate never>
      <main class="container">
        <h1>{{ $page.node.title }}</h1>

        <div class="text-body" v-html="$page.node.content"></div>
      </main>
    </LazyHydrate>
  </Layout>
</template>

<page-query>
query Service($path: String) {
  node: service(path: $path) {
    path
    content
    title
    description
  }
}
</page-query>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import MenuServices from '~/components/MenuServices.vue'

export default {
  components: {
    LazyHydrate,
    MenuServices,
  },

  metaInfo() {
    return {
      title: this.$page.node.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.node.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.node.title,
        },
      ],
    }
  },
}
</script>
