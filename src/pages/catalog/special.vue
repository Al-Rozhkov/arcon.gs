<template>
  <Layout>
    <main class="cnt">
      <section class="mb-3">
        <h1>Специальный инструмент</h1>

        <p>
          Заполните форму конструктора и отправьте нам сохраненный PDF файл вариант для
          расчета, указав обрабатываемый материал и необходимость покрытия.
        </p>

        <p>
          <a href="/uploads/end_mill_300.pdf">Фреза концевая из&nbsp;твердого сплава специальная</a>
        </p>

        <p>
          <a href="/uploads/drill_300.pdf">Сверло спиральное из твердого сплава специальное</a>
        </p>
      </section>

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
