<template>
  <Layout>
    
    <main class="block">
      <front-hero />

      <front-news />
    
      <catalog-block />

      <front-advantages />
    </main>

    <section class="services-wrapper">
      <div class="block">
        <front-services />
      </div>
    </section>

  </Layout>
</template>

<script>
import FrontHero from '~/components/blocks/FrontHero'
import FrontAdvantages from '~/components/blocks/FrontAdvantages'
import FrontServices from '~/components/blocks/FrontServices'
import FrontNews from '~/components/blocks/FrontNews'
import CatalogBlock from '~/components/blocks/CatalogBlock'

export default {
  components: {
    FrontHero,
    FrontAdvantages,
    FrontServices,
    FrontNews,
    CatalogBlock
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
