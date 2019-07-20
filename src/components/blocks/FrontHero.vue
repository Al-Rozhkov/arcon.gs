<template>
  <section class="hero" v-once>
    <div class="aside">
      <g-image class="img" src="~/assets/img/hero.jpg" />
    </div>

    <div class="body">
      <h1>Производим режущий инструмент и&nbsp;станочную оснастку</h1>
      <h3 class="h3">ISO 9001, ГОСТ РВ 0015-002-2012</h3>
      <p
        class="narrow"
      >Предприятие соответствует международным стандартам качества, имеет право производить продукцию в рамках обеспечения гособоронзаказа</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  @extend %grid-row-wrap;

  align-items: center;
  margin-bottom: 40px;
}

.img {
  max-width: 100%;
  height: auto;
  margin: -15px;
}


.h3 {
  font-weight: $font-weight-base;
  font-size: 2rem;
}

.narrow {
  max-width: 460px;
}

@include media-breakpoint-up(md) {
  .hero {
    margin-bottom: 70px;
  }

  .aside {
    @include make-col(12);

    .img {
      margin: -15px -60px;
    }
  }

  .body {
    @include make-col(12);
  }
}

@include media-breakpoint-up(lg) {
  .aside {
    @include make-col(13);
  }

  .body {
    @include make-col(11);
  }
}
</style>
