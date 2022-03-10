<template>
  <page-layout>
    <main class="container">
      <series-page :node="$page.series" :tools="$page.tools" />
    </main>
  </page-layout>
</template>

<page-query>
query Drill($path: String, $id: String!) {
  series: productDrill(path: $path) {
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
    sharpeningAngle
    allowanceCuttingDiameter
    coolantSupply {
      id
      text
    }
    cogsPitch
    cogsNumber
    cogsCuttingCenter
    grooveInclination
    productSeriesSet {
      set
    }
  }
  tools: allProductItemDrill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        id
        series
        name
        a
        d1
        d2
        l1
        l2
        ap
        form
        range
      }
    }
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPage from '~/components/catalog/SeriesPage.vue'

export default {
  components: {
    PageLayout,
    SeriesPage,
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
