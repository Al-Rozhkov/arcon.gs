<template>
  <Layout>
    <template #submenu>
      <menu-services class="submenu" />
    </template>

    <main class="cnt">
      <h1>{{ $page.node.title }}</h1>

      <div class="text-body" v-html="$page.node.content"></div>
    </main>
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
import MenuServices from '~/components/MenuServices.vue'

export default {
  components: {
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
