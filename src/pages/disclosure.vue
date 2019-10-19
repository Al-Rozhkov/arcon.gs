<template>
  <Layout>
    <main class="cnt">
      <h1>Раскрытие информации</h1>

      <section>
        <arconit-logos height="70" class="arconit-logo" />
      </section>

      <p>Зарегистрированные торговые марки режущего инструмента.</p>
      <p>
        Страна происхождения продукции, товаров и услуг Arconit — Российская Федерация <a href="/docs/Arconit-russian_produced.pdf">(Скачать письмо-заявление)</a>.
      </p>
      <p>Сертификация производства и продукции: ГОСТ ISO 9001 и ГОСТ РВ 0015-002-2012.</p>
      <!-- 
        (вставить ссылку на скачку из папки на русском языке; на английском языке) (в папке картинки в формате jpeg – надо сделать 2 файла на рус. И англ. Языке в формате pdf их вайлов ISO9001_RUS_1 и ISO9001_RUS_2; ISO9001_ENG_1 b ISO9001_ENG_2 – второй файл);
        // Потом будем добавлять документы по сертификации
      -->
      <p>
        <a
          href="/docs/Spec_ocenka_yslovij.pdf"
        >Результаты проведения специальной оценки условий труда</a>.
      </p>
    </main>
  </Layout>
</template>

<script>
import ArconitLogos from '@/components/ArconitLogos.vue'

export default {
  components: {
    ArconitLogos
  },

  metaInfo: {
    title: 'Раскрытие информации'
  }
}
</script>

<style lang="scss" scoped>
.arconit-logo {
  margin-bottom: 1rem;
}
</style>