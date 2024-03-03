<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />

      <series-page-tabs :id="$page.series.id" />

      <div>
        <h2 class="mb-2">Калькулятор режимов резания</h2>

        <series-page-modes-calculator :series="$page.series" />
      </div>
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
  }
  modes: allModeEndMill(
    filter: { series: { eq: $id } }
  ) {
    edges {
      node {
        id
        series
        type
        material
        kap
        kae
        nodes {
          d
          n
          fv
          fn
          ap
          ae
        }
      }
    }
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTabs from '~/components/catalog/SeriesPageTabs.vue'
import SeriesCuttingModes from '~/components/catalog/SeriesCuttingModes'
import SeriesPageModesCalculator from '../components/catalog/SeriesPageModesCalculator.vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesCuttingModes,
    SeriesPageModesCalculator,
  },

  metaInfo() {
    const title = 'Калькулятор режимов резания ' + this.$page.series.title

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
