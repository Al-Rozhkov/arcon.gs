<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />
      
      <series-page-tabs :node="$page.series" />
      
      <series-page-tools :node="$page.series" :tools="$page.tools" />
    </main>
  </page-layout>
</template>

<page-query>
query EndMill($path: String, $id: String!) {
  series: productEndMill(path: $path) {
    title
    keywords
    id
    fusion
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
    endShapes {
      id
      text
    }
    cuttingShapes {
      id
      text
    }
    cogsPitch
    cogsNumber
    cogsCuttingCenter
    grooveInclination
    allowanceRadius
    allowanceCuttingDiameter
    productSeriesSet {
      set
    }
    hasCuttingModes
  }
  tools: allProductItemEndMill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
  ) {
    edges {
      node {
        id
        series
        name
        d1
        d2
        d3
        r
        f45
        l1
        l2
        ap
        z
        form
        tip
        range
      }
    }
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTabs from '~/components/catalog/SeriesPageTabs.vue'
import SeriesPageTools from '~/components/catalog/SeriesPageTools.vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesPageTools,
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
