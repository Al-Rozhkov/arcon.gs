<template>
  <Layout>
    <template #submenu>
      <techs-list class="submenu" />
    </template>
    
    <main class="cnt">
      <h1>Токарная ЧПУ обработка</h1>

      <p class="lead">
        ...
      </p>
    </main>

  </Layout>
</template>

<script>
import TechsList from '~/components/TechsList.vue'

export default {
  components: {
    TechsList
  },

  metaInfo: {
    title: 'Токарная ЧПУ обработка'
  }
}
</script>
