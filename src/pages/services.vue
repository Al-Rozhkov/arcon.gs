<template>
  <Layout>
    <main class="container">
      <div class="tile-row">
        <div class="col-lg-6">
          <h1 class="page-title">{{ $page.page.title }}</h1>
        </div>

        <div class="col-lg-18">
          <front-services />
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "services") {
    id
    title
    description
    content
  }
}
</page-query>

<script>
import { hydrateNever } from 'vue-lazy-hydration'

export default {
  components: {
    FrontServices: hydrateNever(() =>
      import('~/components/blocks/FrontServices.vue')
    ),
  },

  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page.description,
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
