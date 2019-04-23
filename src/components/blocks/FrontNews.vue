<template>
  <section class="cc-4cols news-teasers">
    <div class="col">
      <g-link to="/news/12">
        <figure>
          <g-image src="~/assets/news-img/12.jpg" width="255" height="150" />
        </figure>
        <h3 class="news-title">
          Запущены новые серии инструмента универсального применения.
        </h3>
      </g-link>
    </div>
    <div class="col">
      <g-link to="/news/11">
        <figure>
          <g-image src="~/assets/news-img/11.jpg" width="255" height="150" />
        </figure>
        <h3 class="news-title">
          Акция: переточка каждой четвертой фрезы бесплатно.
        </h3>
      </g-link>
    </div>
    <div class="col">
      <g-link to="/news/10">
        <figure>
          <g-image src="~/assets/news-img/10.jpg" width="255" height="150" />
        </figure>
        <h3 class="news-title">
          Запущены в серийное производство центровочные сверла, фасонные фасочные фрезы серий 7V и 7R.
        </h3>
      </g-link>
    </div>
    <div class="col">
      <h3>
        Металлообработка 2019
      </h3>
      <p>
        Приглашаем посетить наш стенд на 20-й международной специализированной выставке в «Экспоцентре» на Краснопресненской набережной.
      </p>
      <p>
        Стенд 24B70 (Павильон №2, зал 4).
      </p>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/assets/scss/modules/columns.scss';

.news-teasers {
  margin-bottom: 40px;

  @include media-breakpoint-up(md) {
    margin-bottom: 70px;
  }

  a {
    display: block;
    cursor: pointer;
    
    h3, p {
      color: $black;  
    }

    &:hover {
      figure {
        @include box-shadow(0 0 30px rgba(0,0,0,0.2));
      }

      h3 {
        color: $red;
      }
    }
  }

  figure {
    border-radius: 6px;
    max-width: 255px;
    position: relative;
    overflow: hidden;
    @include box-shadow(0 0 20px rgba(0,0,0,0.15));
  }
  
  h3.news-title {
    font-size: 1rem;
  }
}
</style>
