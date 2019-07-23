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

    <section class="cnt">
      <front-services />
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
    FrontAdvantages: hydrateSsrOnly(() =>
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
    title: 'ЦВМ Аркон. Технологии высокоточной механообработки'
  }
}
</script>

<style lang="scss">
.gray-wrapper {
  // border-top: 4px solid $pink;
  // border-bottom: 3px solid #ffffff;
  background-color: $gray-100;
}
</style>
