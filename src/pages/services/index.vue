<template>
  <Layout>
    <main class="cnt">
      <div class="tile-row">
        <div class="col-lg-6">
          <h1>Услуги</h1>
        </div>

        <div class="col-lg-18">
          <front-services />
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import { hydrateSsrOnly } from 'vue-lazy-hydration'

export default {
  components: {
    FrontServices: hydrateSsrOnly(() =>
      import('~/components/blocks/FrontServices.vue')
    )
  },
  
  metaInfo: {
    title: 'Услуги'
  }
}
</script>
