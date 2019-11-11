<template>
  <Layout>
    <main class="cnt">
      <h1>Раскрытие информации</h1>

      <section>
        <arconit-logos height="70" class="arconit-logo" />
      </section>

      <p>Зарегистрированные торговые марки режущего инструмента.</p>
      <p>
        Страна происхождения продукции, товаров и услуг Arconit — Российская Федерация
        <a href="/docs/Arconit-russian_produced.pdf">(Скачать письмо-заявление)</a>.
      </p>
      <p>Сертификация производства и продукции: ГОСТ ISO 9001 и ГОСТ РВ 0015-002-2012.</p>

      <p>
        <a class="sert-link" href="/docs/iso9001_eng.pdf">
          <g-image src="~/assets/img/docs/ISO9001_ENG_1.jpg" width="120" class="sert" />
        </a>
        <a class="sert-link" href="/docs/iso9001_rus.pdf">
          <g-image src="~/assets/img/docs/ISO9001_RUS_1.jpg" width="120" class="sert" />
        </a>
      </p>
      
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

.sert-link {
  margin-right: 0.5rem;

  .sert:hover {
    opacity: 0.75;
  }
}
</style>