<template>
  <Layout>
    <main class="cnt text-body">
      <h1>Раскрытие информации</h1>

      <div class="flex-row group-section">
        <section class="col-lg-8">
          <arconit-logo height="70" class="arconit-logo" />
          <arconit-logo-ru height="70" class="arconit-logo" />
        </section>

        <section class="col-lg-8">
          <p>Зарегистрированные торговые марки режущего инструмента.</p>
        </section>
      </div>

      <div class="group-section">
        <p>
          Страна происхождения продукции, товаров и услуг Arconit — Российская Федерация
          <a
            href="/docs/Arconit-russian_produced.pdf"
          >(Скачать письмо-заявление)</a>.
        </p>
      </div>

      <div class="group-section">
        <p>Сертификация производства и продукции: ГОСТ ISO 9001 и ГОСТ РВ 0015-002-2012.</p>

        <p>
          <a class="sert-link" href="/docs/iso9001_eng.pdf">
            <g-image src="~/assets/img/docs/ISO9001_ENG_1.jpg" width="120" class="sert" />
          </a>
          <a class="sert-link" href="/docs/iso9001_rus.pdf">
            <g-image src="~/assets/img/docs/ISO9001_RUS_1.jpg" width="120" class="sert" />
          </a>
        </p>
      </div>

      <div class="group-section">
        <p>
          <a
            href="/docs/Spec_ocenka_yslovij.pdf"
          >Результаты проведения специальной оценки условий труда</a>.
        </p>
      </div>
    </main>
  </Layout>
</template>

<script>
import ArconitLogo from '@/components/ArconitLogo.vue'
import ArconitLogoRu from '@/components/ArconitLogoRu.vue'

export default {
  components: {
    ArconitLogo,
    ArconitLogoRu
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

.group-section {
  border-bottom: 1px solid $gray-400;
  margin-bottom: 3rem;
}
</style>