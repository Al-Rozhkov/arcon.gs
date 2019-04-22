<template>
  <Layout>
    
    <main class="block">
      <h1>Hello, world!</h1>

      <p>Show me the stuff</p>
    
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
import FrontAdvantages from '~/components/blocks/FrontAdvantages'
import FrontServices from '~/components/blocks/FrontServices'
import CatalogBlock from '~/components/blocks/CatalogBlock'

export default {
  components: {
    FrontAdvantages,
    FrontServices,
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
