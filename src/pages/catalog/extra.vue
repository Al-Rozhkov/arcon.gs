<template>
  <Layout>
    <main class="cnt">
      <section class="mb-3 pb">
        <h1>{{ $page.page.title }}</h1>

        <div class="text-body" v-html="$page.page.content"></div>

        <div class="col-lg-18 list-group">
          <a
            v-for="{ node } in $page.docs.edges"
            :key="node.id"
            :href="node.file.src"
            download
            class="list-group-item list-group-item-action"
          >
            <h3 class="text-brand">
              {{ node.title }}
            </h3>
            <div v-if="node.text">
              {{ node.text }}
            </div>
          </a>
        </div>
      </section>

      <catalog-block />
    </main>
  </Layout>
</template>

<page-query>
query ProductCustom {
  page: mdPage(id: "extra-catalog") {
    id
    title
    description
    content
  }
  docs: allProductExtra(sortBy: "weight", order: ASC) {
    edges{
      node {
        id
        title
        file
        text
      }
    }
  }
}
</page-query>

<script>
import CatalogBlock from '~/components/blocks/CatalogBlock'

export default {
  components: {
    CatalogBlock,
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
