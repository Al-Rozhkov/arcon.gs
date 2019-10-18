<template>
  <Layout>

    <main class="cnt">
      <h1>Специальный инструмент</h1>

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
    title: 'Специальный инструмент'
  }
}
</script>
