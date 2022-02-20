<template>
  <Layout>
    <main class="container text-body">
      <h1>{{ $page.page.title }}</h1>

      <div class="flex-row group-section">
        <section class="col-lg-6">
          <arconit-logo height="42" class="arconit-logo" />
          <arconit-logo-ru height="42" class="arconit-logo" />
        </section>

        <section class="col-lg-6" style="display: flex">
          <p style="align-self: center">{{ $page.tTm.value }}</p>
        </section>
      </div>

      <div class="group-section">
        <p>
          {{ $page.tMadeIn.value }}
          <a
            href="/uploads/Arconit-russian_produced.pdf"
            target="_blank"
          >{{ $page.tDownloadLetter.value }}</a>.
        </p>
      </div>

      <div class="group-section">
        <p>{{ $page.tSertProd.value }}</p>

        <p>
          <a class="sert-link" href="/uploads/iso9001_eng.pdf" target="_blank">
            <g-image src="~/assets/img/docs/ISO9001_ENG_1.jpg" width="120" class="sert" />
          </a>
          <a class="sert-link" href="/uploads/iso9001_rus.pdf" target="_blank">
            <g-image src="~/assets/img/docs/ISO9001_RUS_1.jpg" width="120" class="sert" />
          </a>
        </p>
      </div>

      <div class="group-section">
        <p>{{ $page.tSertGoods.value }}</p>

        <p>
          <a class="sert-link" href="/uploads/tu_list_registratsii.pdf" target="_blank">
            <g-image src="~/assets/img/docs/tu_list_registratsii.png" width="120" class="sert" />
          </a>
          <a class="sert-link" href="/uploads/deklaratsia_o_sootvetstvii_TR_TS.pdf" target="_blank">
            <g-image
              src="~/assets/img/docs/deklaratsia_o_sootvetstvii_TR_TS.png"
              width="120"
              class="sert"
            />
          </a>
        </p>
      </div>

      <div class="group-section">
        <p>
          <a
            href="/uploads/Spec_ocenka_yslovij.pdf"
            target="_blank"
          >{{ $page.tWorkingConditions.value }}</a>
        </p>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "disclosure") {
    id
    title
    description
    content
  }
  tTm: t(id: "disclosure.tm") {
    value
  }
  tMadeIn: t(id: "disclosure.made-in") {
    value
  }
  tDownloadLetter: t(id: "disclosure.download-letter") {
    value
  }
  tSertProd: t(id: "disclosure.sert-prod") {
    value
  }
  tSertGoods: t(id: "disclosure.sert-goods") {
    value
  }
  tWorkingConditions: t(id: "disclosure.working-conditions") {
    value
  }
}
</page-query>

<script>
import ArconitLogo from '@/components/ArconitLogo.vue'
import ArconitLogoRu from '@/components/ArconitLogoRu.vue'

export default {
  components: {
    ArconitLogo,
    ArconitLogoRu
  },

  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page.excerpt,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.page.title,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.arconit-logo {
  margin-bottom: 1rem;
}

.sert-link {
  display: inline-block;
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