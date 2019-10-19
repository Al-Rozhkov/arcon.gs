<template>
  <Layout>
    <main class="cnt">
      <front-hero />
      <front-news />
      <catalog-block />
    </main>

    <section class="gray-wrapper">
      <div class="cnt">
        <front-advantages />
      </div>
    </section>

    <section class="services-wrapper">
      <div class="cnt">
        <div class="tile-row">
          <div class="col-lg-6">
            <h2 class="h2-blind">Услуги</h2>
          </div>

          <div class="col-lg-18">
            <front-services />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import { hydrateSsrOnly, hydrateWhenIdle } from 'vue-lazy-hydration'

export default {
  components: {
    FrontHero: hydrateWhenIdle(() =>
      import('~/components/blocks/FrontHero.vue')
    ),
    FrontAdvantages: hydrateWhenIdle(() =>
      import('~/components/blocks/FrontAdvantages.vue')
    ),
    FrontServices: hydrateSsrOnly(() =>
      import('~/components/blocks/FrontServices.vue')
    ),
    FrontNews: hydrateWhenIdle(() =>
      import('~/components/blocks/FrontNews.vue')
    ),
    CatalogBlock: hydrateWhenIdle(() =>
      import('~/components/blocks/CatalogBlock.vue')
    )
  },

  metaInfo: {
    title: 'ARCONIT – Режущий инструмент',
    titleTemplate: null
  }
}
</script>

<style lang="scss" scoped>
.gray-wrapper {
  background-color: $gray-100;
}

@include media-breakpoint-up(lg) {
  .services-wrapper:hover {
    .h2-blind {
      color: $gray-400;
    }
  }

  .h2-blind {
    font-size: 4rem;
    color: $gray-200;
  }
}
</style>
