<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />
      
      <series-page-tools :node="$page.series" :tools="$page.tools" />
    </main>
  </page-layout>
</template>

<page-query>
query TreadMill($path: String, $id: String!) {
  series: productThreadMill(path: $path) {
    title
    keywords
    id
    photos(width: 800, quality: 75)
    content
    scheme {
      name
      scheme
    }
    mainUsage {
      id
      text
    }
    possibleUsage {
      id
      text
    }
    coating {
      text
    }
    tail
    cuttingShapes {
      id
      text
    }
    coolantSupply {
      id
      text
    }
    productSeriesSet {
      set
    }
    toolProfile
    toolForming
  }
  tools: allProductItemThreadMill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        id
        series
        name
        step
        thread
        d1
        d2
        l1
        l2
        z
        range
      }
    }
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTools from '~/components/catalog/SeriesPageTools.vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTools
  },

  metaInfo() {
    const title = this.$page.series.title
    
    return {
      title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.series.content,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: this.$page.series.keywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },
}
</script>
