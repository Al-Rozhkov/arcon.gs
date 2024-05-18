<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />
      
      <series-page-tabs :id="$page.series.id" />

      <div v-if="isAvailable">
        <template v-if="modes.ledge.length">
          <h2 class="mb-2">Режимы обработки уступа</h2>
          <series-cutting-modes :items="modes.ledge" />
        </template>

        <template v-if="modes.groove.length">
          <h2 class="mb-2">Режимы обработки паза</h2>
          <series-cutting-modes :items="modes.groove" :ledges="false" />
        </template>

        <div v-if="$page.series.modesComment" class="alert alert-warning mb-4" v-html="$page.series.modesComment"></div>

        <!-- <h2 class="mb-2">Калькулятор режимов резания</h2>
        <series-page-modes-calculator
          :series="$page.series"
          :tools="$page.tools.edges"
          :modes="$page.modes.edges"
        /> -->
      </div>

      <div v-else class="mb-4">
        Для получения режимов резания этого инструмента свяжитесь с нашими представителями.
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
    modesComment
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
  modes: allModeEndMill(
    filter: { series: { eq: $id } }
    sortBy: "id"
    order: ASC
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
import SeriesPageModesCalculator from '~/components/catalog/SeriesPageModesCalculator.vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesCuttingModes,
    SeriesPageModesCalculator,
  },

  computed: {
    isAvailable() {
      return this.modes.groove.length || this.modes.groove.length
    },
    modes() {
      const ledge = []
      const groove = []

      for (const { node } of this.$page.modes.edges) {
        if (node.type === 'ledge') {
          ledge.push(node)
        }
        if (node.type === 'groove') {
          groove.push(node)
        }
      }

      return { ledge, groove }
    }
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
