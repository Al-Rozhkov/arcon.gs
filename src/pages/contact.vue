<template>
  <Layout>
    <div class="contact-page">
      <main class="cnt">
        <h1>Контактная информация</h1>

        <section class="pt flex-row">
          <div class="col-lg-12">
            <section>
              <h3>Отдел сбыта режущего инструмента</h3>
              <p>
                Тел.: (8412)&nbsp;500-117
                <br />e-mail:
                <a href="mailto:gid@cvm-arcon.ru">gid@cvm-arcon.ru</a>
              </p>
            </section>

            <section class="pt-sm">
              <h3>Диспетчерский отдел</h3>
              <p>
                Тел.: (8412)&nbsp;45-89-90 доб. 1
                <br />e-mail:
                <a href="mailto:gid@cvm-arcon.ru">gid@cvm-arcon.ru</a>
              </p>
            </section>

            <section class="pt-sm">
              <h3>Бухгалтерия</h3>
              <p>
                Тел.: (8412)&nbsp;45-89-90 доб. 2
                <br />e-mail:
                <a href="mailto:buh@cvm-arcon.ru">buh@cvm-arcon.ru</a>
              </p>
            </section>

            <section class="pt-sm">
              <h3>По общим вопросам и&nbsp;закупкам</h3>
              <p>
                E-mail:
                <a href="mailto:sales@cvm-arcon.ru">sales@cvm-arcon.ru</a>
              </p>
              <p>
                Все предложения по&nbsp;поставкам и&nbsp;оснащению принимаются
                только путем электронной корреспонденции.
              </p>
            </section>
          </div>
          <div class="col-lg-12 sym-wrapper">
            <p class="lead">
              ООО &laquo;Центр высокоточной механообработки &laquo;Аркон&raquo;
            </p>
            <p>
              Россия, 440052, Пензенская обл., г.&nbsp;Пенза, ул.&nbsp;Гоголя,
              д.&nbsp;51/53
            </p>
          </div>
        </section>
      </main>

      <arconit-symbol class="arconit-symbol" />
    </div>
  </Layout>
</template>

<script>
import ArconitSymbol from '@/components/ArconitSymbol.vue'

export default {
  components: {
    ArconitSymbol,
  },

  metaInfo: {
    title: 'Контактная информация. ЦВМ «Аркон»',
    titleTemplate: null,
  },
}
</script>

<style lang="scss" scoped>
.contact-page {
  position: relative;
  overflow: hidden;
}

.arconit-symbol {
  position: absolute;
  width: 65%;
  top: 10%;
  left: 45%;
  opacity: 0.1;
}
</style>
