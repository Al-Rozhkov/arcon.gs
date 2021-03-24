<template>
  <Layout>
    <main class="cnt">
      <h1>Представители</h1>

      <p>Готовы рассмотреть предложения по&nbsp;открытию представительства или предоставлении дилерства в&nbsp;вашем регионе.</p>

      <section class="flex-row pt">
        <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ЦВМ &laquo;Аркон&raquo;</h3>
            <p>
              <em>Производитель</em>
            </p>
          </header>
          <p>Россия, г. Пенза</p>
          <p>
            Тел.: (8412) 500-117
          </p>
          <p>www.arconit.ru gid@cvm-arcon.ru</p>
        </div>

        <!-- <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО НПП &laquo;Виал&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Пенза.</p>
          <p>Тел.: (8412) 45-84-64</p>
          <p>vialnpp@yandex.ru</p>
        </div> -->

        <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;Аркон-Урал&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Екатеринбург</p>
          <p>
            Тел.: (343) 318-27-47,
            <span class="text-nowrap">+7&nbsp;922 113-52-47</span>
          </p>
          <p>ural@cvm-arcon.ru</p>
        </div>

        <!-- <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ТЗТС&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Тула</p>
          <p>
            Тел.: (4872) 36-73-45,
            <span class="text-nowrap">+7&nbsp;903 844-55-45</span>
          </p>
          <p>tz-ts-tula@mail.ru</p>
        </div> -->

        <!-- <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ПРОФИТ-ССК&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Москва</p>
          <p>Тел.: (495) 369-43-72</p>
          <p>profit-ssk@mail.ru</p>
        </div> -->

        <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ПромСнабСервис&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Смоленск</p>
          <p>
            Тел.: (4812) 54-86-00,
            <span class="text-nowrap">+7&nbsp;930 305-86-00</span>
          </p>
          <p>sml.pss@yandex.ru</p>
        </div>

        <!-- <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ВК-Технологии&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Саратов</p>
          <p>Тел.: (8452) 68-15-23</p>
          <p>vk-technology@list.ru</p>
        </div> -->

        <!-- <div class="col-lg-8 item">
          <header class="item-head">
            <h3 class="h3">ООО &laquo;ВМ-ТЕХ&raquo;</h3>
            <p>
              <em>Дилер</em>
            </p>
          </header>
          <p>Россия, г. Саратов</p>
          <p>Тел.: (8452) 93-32-45</p>
          <p>www.vm-tex58.ru info@vm-tex58.ru</p>
        </div> -->
      </section>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Представители'
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding-bottom: 2rem;
}

.item-head {
  margin-bottom: 1rem;

  .h3 {
    margin-bottom: 0;
  }
}

@include media-breakpoint-up(lg) {
  .item {
    padding-right: 2rem;
  }
}
</style>
