<template>
  <Layout>
    <main class="cnt">
      <h1>Технологии</h1>

      <section class="tile-root">
        <div class="tile-row">
          <g-link to="/tech/grinding" class="col left1">
            <h2 class="h2">Шлифовальная обработка</h2>
            <p
              class="p"
            >Шлифование круглое наружное, бесцентровое, плоское, координатное, круглое внутреннее</p>
          </g-link>

          <g-link to="/tech/electroerosion" class="col right1">
            <h2 class="h2">Электроэрозионная обработка</h2>
            <p
              class="p"
            >Cтанки проволочно-вырезные, позволяющие обрабатывать контур сложной формы в&nbsp;зонах без возможности захода режущего инструмента, с&nbsp;высокой повторяемостью.</p>
            <p
              class="p"
            >Cтанки прошивные для формирования глухих пазов, с&nbsp;минимальными радиусами на&nbsp;всех контактных точках.</p>
          </g-link>
        </div>

        <div class="tile-row">
          <g-link to="/tech/milling" class="col left2">
            <h2 class="h2">Фрезерная ЧПУ обработка</h2>
            <p
              class="p"
            >Обработка ведется полным циклом, от&nbsp;создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с&nbsp;промежуточными операциями контроля.</p>
          </g-link>

          <g-link to="/tech/lathe" class="col right2">
            <h2 class="h2">Токарная ЧПУ обработка</h2>
            <p class="p">Максимальный обрабатываемый наружный диаметр&nbsp;&mdash; 457&nbsp;мм.</p>
            <p class="p">Максимальная длина точения&nbsp;&mdash; 584&nbsp;мм.</p>
          </g-link>
        </div>
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
    title: 'Технологии'
  }
}
</script>

<style lang="scss" scoped>
.tile-root {
  margin-bottom: 120px;
}

.h2 {
  font-weight: $font-weight-base;
}

.p {
  max-width: 460px;
}

.h2,
.p {
  position: relative;
  z-index: 20;
}

.col {
  position: relative;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background: gray('100');
  border: 2px solid $white;
  min-height: 280px;
  color: $black;
  cursor: pointer;

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    opacity: 0.25;
    z-index: 10;
    transition: opacity 0.5s ease-out;
  }

  &:hover::after {
    opacity: 0.7;
  }
}

.left1::after {
  background-image: url(/img/tech/shlif.jpg);
}

.right1::after {
  background-image: url(/img/tech/electroeroz.jpg);
}

.left2::after {
  background-image: url(/img/tech/frezer.jpg);
}

.right2::after {
  background-image: url(/img/tech/tokar.jpg);
}

@include media-breakpoint-up(lg) {
  .left1 {
    @include make-col(9);
  }

  .right1 {
    @include make-col(15);
  }

  .left2 {
    @include make-col(11);
  }

  .right2 {
    @include make-col(13);
  }
}
</style>
