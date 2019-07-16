<template>
  <Layout>
    
    <main class="cnt">
      <front-hero />
      <front-news />
      <catalog-block />
      <front-advantages />
    </main>

    <section class="services-wrapper">
      <div class="cnt">
        <front-services />
      </div>
    </section>

  </Layout>
</template>

<script>
import { hydrateSsrOnly, hydrateWhenIdle } from 'vue-lazy-hydration'

export default {
  components: {
    FrontHero: hydrateWhenIdle(
      () => import('~/components/blocks/FrontHero.vue')
    ),
    FrontAdvantages: hydrateSsrOnly(
      () => import('~/components/blocks/FrontAdvantages.vue')
    ),
    FrontServices: hydrateSsrOnly(
      () => import('~/components/blocks/FrontServices.vue')
    ),
    FrontNews: hydrateWhenIdle(
      () => import('~/components/blocks/FrontNews.vue')
    ),
    CatalogBlock: hydrateWhenIdle(
      () => import('~/components/blocks/CatalogBlock.vue')
    )
  },

  metaInfo: {
    title: 'ЦВМ Аркон. Технологии высокоточной механообработки'
  }
}
</script>

<style lang="scss">
.services-wrapper {
  border-top: 4px solid $pink;
  // background: lighten($cyan, 40%);
}
</style>
