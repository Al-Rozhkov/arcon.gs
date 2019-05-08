<template>
  <Layout>

    <main class="block">
      <h1>Технологии</h1>

      <section class="tile-root">
        <div class="tile-row">
          <g-link
            to="/tech/grinding"
            class="left1"
          >
            <h2>
              Шлифовальная обработка
            </h2>
            <p>
              Шлифование круглое наружное, бесцентровое, плоское, координатное, круглое внутреннее
            </p>
            <div class="bg"></div>
          </g-link>

          <g-link
            to="/tech/electroerosion"
            class="right1"
          >
            <h2>
              Электроэрозионная обработка
            </h2>
            <p>
              Cтанки проволочно-вырезные, позволяющие обрабатывать контур сложной формы в зонах без возможности захода режущего инструмента, с высокой повторяемостью.
            </p>
            <p>
              Cтанки прошивные для формирования глухих пазов, с минимальными радиусами на всех контактных точках.
            </p>
            <div class="bg"></div>
          </g-link>
        </div>

        <div class="tile-row">
          <g-link
            to="/tech/milling"
            class="left2"
          >
            <h2>
              Фрезерная ЧПУ обработка
            </h2>
            <p>
              Обработка ведется полным циклом, от создания 3д-моделей, разработки управляющих программ, ведения техпроцесса с промежуточными операциями контроля.
            </p>
            <div class="bg"></div>
          </g-link>

          <g-link
            to="/tech/lathe"
            class="right2"
          >
            <h2>
              Токарная ЧПУ обработка
            </h2>
            <p>
              Максимальный обрабатываемый наружный диаметр — 457 мм.
            </p>
            <p>
              Максимальная длина точения — 584 мм.
            </p>
            <div class="bg"></div>
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

<style lang="scss">
.tile-root {
  margin-bottom: 120px;

  h2 {
    font-weight: $font-weight-base;
  }
}

.tile-row {
  @extend %grid-row-wrap;
  @include make-grid-gutter($col-selector: ".left1, .left2, .right1, .right2");

  h2, p {
    position: relative;
    z-index: 20;
  }

  p {
    max-width: 460px;
  }

  .left1, .right1,
  .left2, .right2 {
    position: relative;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    background: gray("100");
    border: 2px solid $white;
    min-height: 280px;
    cursor: pointer;

    .bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background-size: cover;
      opacity: .25;
      z-index: 10;
    }

    &:hover {
      .bg {
        opacity: .7;
      }
    }
  }

  .left1 {
    .bg {
      background-image: url(/tech/shlif.jpg);
    }

    @include media-breakpoint-up(lg) {
        @include make-col(9);
    }
  }

  .right1 {
    .bg {
      background-image: url(/tech/electroeroz.jpg);
    }

    @include media-breakpoint-up(lg) {
        @include make-col(15);
    }
  }

  .left2 {
    .bg {
      background-image: url(/tech/frezer.jpg);
    }

    @include media-breakpoint-up(lg) {
        @include make-col(11);
    }
  }

  .right2 {
    .bg {
      background-image: url(/tech/tokar.jpg);
    }

    @include media-breakpoint-up(lg) {
        @include make-col(13);
    }
  }
}
</style>
