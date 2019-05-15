<template>
  <Layout>

    <main class="block">
      <h1>Конструктор инструмента</h1>

      <p class="lead">
        ...
      </p>

      <catalog-block />
    </main>

  </Layout>
</template>

<script>
import CatalogBlock from '~/components/blocks/CatalogBlock'

export default {
  components: {
    CatalogBlock
  },

  metaInfo: {
    title: 'Конструктор инструмента'
  }
}
</script>
