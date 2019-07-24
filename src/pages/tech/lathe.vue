<template>
  <Layout>
    <template #submenu>
      <techs-list class="submenu" />
    </template>

    <main class="cnt">
      <h1>Токарная ЧПУ обработка</h1>

      <article class="text-body">
        <p>Правильный выбор оборудования для токарной обработки часто позволяет повысить эффективность работы, исключить дополнительные переналадки и&nbsp;операции. В&nbsp;частности, это обеспечивается применением оси&nbsp;Y с&nbsp;приводным инструментом.</p>
        <p>Обработка ведется полным циклом, от&nbsp;создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с&nbsp;промежуточными операциями контроля. Все машины укомплектованы барфидерами для непрерывной подачи заготовок.</p>
        <p>Максимальный обрабатываемый наружный диаметр&nbsp;&mdash; 457&nbsp;мм.</p>
        <p>Максимальная длина точения&nbsp;&mdash; 584&nbsp;мм.</p>
      </article>
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
