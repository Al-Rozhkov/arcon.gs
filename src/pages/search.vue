<template>
  <Layout>
    <main class="cnt">
      <h1>{{ $page.page.title }}</h1>

      <b-form-input
        id="search"
        class="mb-4"
        v-model="searchTerm"
        type="text"
        placeholder="Что вы ищете?"
      />
      <app-search-results :nodes="seriesSearch" />
      <app-search-results :nodes="contentSearch" />
    </main>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "search") {
    id
    title
    description
    content
  }
}
</page-query>

<script>
import { BFormInput } from 'bootstrap-vue'
import AppSearchResults from '~/components/AppSearchResults.vue'

export default {
  components: {
    BFormInput,
    AppSearchResults,
  },

  data: () => ({
    searchTerm: '',
  }),

  computed: {
    doNotShowResults() {
      return this.searchTerm.length < 3
    },

    seriesSearch() {
      if (this.doNotShowResults || !this.$search.series) return []

      return this.$search.series.search(this.searchTerm, {
        limit: 25,
        suggest: true,
        enrich: true,
      })
    },

    contentSearch() {
      if (this.doNotShowResults || !this.$search.content) return []

      return this.$search.content.search(this.searchTerm, {
        limit: 25,
        suggest: true,
        enrich: true,
      })
    },
  },

  methods: {
    getLabel(index) {
      if (index === 'News') return 'Новость'
      if (
        ['ProductEndMill', 'ProductDrill', 'ProductThreadMill'].includes(index)
      )
        return 'Серия инструмента'
      return false
    },

    prepareResults(results) {},
  },

  watch: {
    $route(to, from) {
      this.searchTerm = ''
    },
  },

  mounted() {
    this.$searchLoad()
    if (this.$route.query.text) {
      this.searchTerm = this.$route.query.text
    }
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

<style lang="scss" scoped>
#search {
  max-width: 34rem;
}
</style>