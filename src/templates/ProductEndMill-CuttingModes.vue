<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />
      
      <series-page-tabs :id="$page.series.id" class="mb-2" />

      <div v-if="isAvailable">
        <template v-if="modes.none.length">
          <h2 class="mb-2">Режимы обработки</h2>
          <series-cutting-modes :items="modes.none" />
        </template>

        <template v-if="modes.ledge.length">
          <div class="flex-row-nowrap gap-2 mb-2">
            <IconModeLedge class="cutting-modes-icon" />
            <h2 class="mb-0">Режимы обработки уступа</h2>
          </div>
          <series-cutting-modes :items="modes.ledge" />
        </template>

        <template v-if="modes.groove.length">
          <div class="flex-row-nowrap gap-2 mb-2">
            <IconModeGroove class="cutting-modes-icon" />
            <h2 class="mb-0">Режимы обработки паза</h2>
          </div>
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
import IconModeLedge from '~/components/icons/IconModeLedge.vue'
import IconModeGroove from '~/components/icons/IconModeGroove.vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesCuttingModes,
    SeriesPageModesCalculator,
    IconModeLedge,
    IconModeGroove
  },

  computed: {
    isAvailable() {
      return this.modes.groove.length || this.modes.groove.length || this.modes.none.length
    },
    modes() {
      const ledge = []
      const groove = []
      const result = {
        'none': [],
        'ledge': [],
        'groove': []
      }

      for (const { node } of this.$page.modes.edges) {
        if (!node.type) {
          result.none.push(node)
        }
        if (node.type === 'ledge') {
          result.ledge.push(node)
        }
        if (node.type === 'groove') {
          result.groove.push(node)
        }
      }

      return result
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

<style lang="scss">
.cutting-modes-icon {
  max-width: 80px;
  margin-top: -0.5rem;
}
</style>