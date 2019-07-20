<template>
  <section class="news-teasers" v-once>
    <div class="col">
      <g-link class="a" to="/news/12">
        <figure class="figure">
          <g-image src="~/assets/news-img/12.jpg" width="255" height="150" />
        </figure>
        <h3 class="h3">Запущены новые серии инструмента универсального применения.</h3>
      </g-link>
    </div>
    <div class="col">
      <g-link class="a" to="/news/11">
        <figure class="figure">
          <g-image src="~/assets/news-img/11.jpg" width="255" height="150" />
        </figure>
        <h3 class="h3">Акция: переточка каждой четвертой фрезы бесплатно.</h3>
      </g-link>
    </div>
    <div class="col">
      <g-link class="a" to="/news/10">
        <figure class="figure">
          <g-image src="~/assets/news-img/10.jpg" width="255" height="150" />
        </figure>
        <h3
          class="h3"
        >Запущены в серийное производство центровочные сверла, фасонные фасочные фрезы серий 7V и 7R.</h3>
      </g-link>
    </div>
    <div class="col">
      <h3 class="h2">Металлообработка 2019</h3>
      <p>Приглашаем посетить наш стенд на 20-й международной специализированной выставке в «Экспоцентре» на Краснопресненской набережной.</p>
      <p>Стенд 24B70 (Павильон №2, зал 4).</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.news-teasers {
  @extend %grid-row-wrap;
  @include make-grid-gutter();
  margin-bottom: 40px;
}

.col {
  margin-bottom: 2rem;
}

@include media-breakpoint-up(md) {
  .news-teasers {
    margin-bottom: 70px;
  }

  .col {
    @include make-col(12);
  }
}

@include media-breakpoint-up(lg) {
  .col {
    @include make-col(6);
  }
}

a.a {
  display: block;
  cursor: pointer;

  &:hover {
    .figure {
      @include box-shadow(0 0 30px rgba(0, 0, 0, 0.2));
    }

    .h3 {
      color: $red;
    }
  }
}

.h3 {
  font-size: 1rem;
  font-weight: $font-weight-base;
}

.h2 {
  font-size: 1.7rem;
  font-weight: $font-weight-base;
}

.h3, .h2 {
  color: $black;
}

.figure {
  border-radius: 6px;
  max-width: 255px;
  position: relative;
  overflow: hidden;
  @include box-shadow(0 0 20px rgba(0, 0, 0, 0.15));
}
</style>
