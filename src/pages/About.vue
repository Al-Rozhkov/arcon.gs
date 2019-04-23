<template>
  <Layout>

    <main class="block">
      <h1>О компании</h1>

      <p class="lead">
        «Arconit» является зарегистрированной торговой маркой режущего инструмента и станочной оснастки. Наша продукция изготавливается в соответствии с регламентированными техническими условиями, а качество поставляемых изделий подтверждено сертификатами соответствия Таможенного Союза.
      </p>
      <p class="lead">
        Наша организация прошла сертификацию по ГОСТ ISO 9001 и ГОСТ РВ 0015-002-2012, имеет право производить продукцию в рамках обеспечения гособоронзаказа.
      </p>

      <section class="section-top">
        <h2 class="block-title">
          Новости компании
        </h2>

        <front-news />
      </section>
    </main>

  </Layout>
</template>

<script>
import FrontNews from '~/components/blocks/FrontNews'

export default {
  components: {
    FrontNews
  },

  metaInfo: {
    title: 'О компании'
  }
}
</script>
