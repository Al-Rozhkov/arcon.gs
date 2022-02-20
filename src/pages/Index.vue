<template>
  <Layout>
    <main class="container">
      <front-hero />
      <front-news />
      <catalog-block />
    </main>

    <section class="bg-gray-100">
      <div class="container">
        <front-advantages />
      </div>
    </section>

    <section class="services-wrapper">
      <div class="container">
        <div class="tile-row">
          <div class="col-lg-6">
            <h2 class="h2-blind">{{ $page.services.value }}</h2>
          </div>

          <div class="col-lg-18">
            <front-services />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  title: t(id: "meta.front.title") {
    value
  }
  slogan: t(id: "site.slogan") {
    value
  }
  services: t(id: "headline.services") {
    value
  }
}
</page-query>

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

  metaInfo() {
    return {
      title: this.$page.title.value,
      titleTemplate: null,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.slogan.value,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.title.value,
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
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
