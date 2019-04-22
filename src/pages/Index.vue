<template>
  <Layout>
    
    <main class="block">
      <h1>Hello, world!</h1>

      <p>Show router</p>
    
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      </p>

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

export default {
  components: {
    FrontAdvantages,
    FrontServices
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
