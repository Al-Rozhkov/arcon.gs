<template>
  <section class="cc-hero">
    <div class="aside">
      <g-image src="~/assets/img/hero.jpg" />
    </div>

    <div class="body">
      <h1>
        Производим режущий инструмент и&nbsp;станочную оснастку
      </h1>
      <h3>
        ISO 9001
      </h3>
      <p class="narrow">
        Предприятие соответствует международным стандартам качества, имеет право производить продукцию в рамках обеспечения гособоронзаказа
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.cc-hero {
  @extend %grid-row-wrap;
  // @include make-grid-gutter($col-selector: ".body");

  align-items: center;
  margin-bottom: 40px;

  @include media-breakpoint-up(md) {
    margin-bottom: 70px;
  }

  .aside {

    img {
      max-width: 100%;
      height: auto;
      margin: -15px;
    }

    @include media-breakpoint-up(md) {
      @include make-col(12);

      img { margin: -15px -60px; }
    }

    @include media-breakpoint-up(lg) {
      @include make-col(13);
    }
  }

  .body {
    h3 {
      font-weight: $font-weight-base;
      font-size: 2rem;
    }

    .narrow {
      max-width: 460px;
    }

    @include media-breakpoint-up(md) {
      @include make-col(12);
    }

    @include media-breakpoint-up(lg) {
      @include make-col(11);
    }
  }
}
</style>
