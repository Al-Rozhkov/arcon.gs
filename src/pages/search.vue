<template>
  <Layout>
    <main class="cnt">
      <h1>Поиск по сайту</h1>

      <b-form-input
        id="search"
        class="mb-3"
        v-model="searchTerm"
        type="text"
        placeholder="Что вы ищете?"
      />
      <app-search-results :nodes="seriesSearch" />
      <app-search-results :nodes="contentSearch" />
    </main>
  </Layout>
</template>

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
      title: 'Поиск по сайту',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Поиск по сайту',
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