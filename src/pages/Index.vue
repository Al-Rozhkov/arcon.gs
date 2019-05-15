<template>
  <Layout>
    
    <LazyHydrate ssr-only>
      <main class="block">
        <front-hero />

        <front-news />
      
        <catalog-block />

        <front-advantages />
      </main>
    </LazyHydrate>

    <LazyHydrate ssr-only>
      <section class="services-wrapper">
        <div class="block">
          <front-services />
        </div>
      </section>
    </LazyHydrate>

  </Layout>
</template>

<script>
// import { hydrateSsrOnly } from 'vue-lazy-hydration'
import LazyHydrate from 'vue-lazy-hydration'

/* import FrontHero from '~/components/blocks/FrontHero'
import FrontAdvantages from '~/components/blocks/FrontAdvantages'
import FrontServices from '~/components/blocks/FrontServices'
import FrontNews from '~/components/blocks/FrontNews'
import CatalogBlock from '~/components/blocks/CatalogBlock' */

export default {
  components: {
    LazyHydrate,
    FrontHero: () => import('~/components/blocks/FrontHero.vue'),
    FrontAdvantages: () => import('~/components/blocks/FrontAdvantages.vue'),
    FrontServices: () => import('~/components/blocks/FrontServices.vue'),
    FrontNews: () => import('~/components/blocks/FrontNews.vue'),
    CatalogBlock: () => import('~/components/blocks/CatalogBlock.vue')
    /* FrontHero: hydrateSsrOnly(
      () => import('~/components/blocks/FrontHero.vue')
    ),
    FrontAdvantages: hydrateSsrOnly(
      () => import('~/components/blocks/FrontAdvantages.vue')
    ),
    FrontServices: hydrateSsrOnly(
      () => import('~/components/blocks/FrontServices.vue')
    ),
    FrontNews: hydrateSsrOnly(
      () => import('~/components/blocks/FrontNews.vue')
    ),
    CatalogBlock: hydrateSsrOnly(
      () => import('~/components/blocks/CatalogBlock.vue')
    ) */
  },

  metaInfo: {
    title: 'ЦВМ Аркон. Технологии высокоточной механообработки'
  }
}
</script>

<style lang="scss">
.services-wrapper {
  border-top: 4px solid $pink;
  background: lighten($cyan, 40%);
}
</style>
