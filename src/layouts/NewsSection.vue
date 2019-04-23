<template>
  <div class="root">
    <div class="nav-header">
      <app-nav />
    </div>

    <div class="block">
      <div class="cc-news-section">
        <main class="body">
          <slot />
        </main>

        <aside class="aside">
          <section class="news-teasers">
            <div class="mb-3">
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
            <div class="mb-3">
              <g-link to="/news/12">
                <figure>
                  <g-image src="~/assets/news-img/12.jpg" width="255" height="150" />
                </figure>
                <h3 class="news-title">
                  Запущены новые серии инструмента универсального применения.
                </h3>
              </g-link>
            </div>
            <div class="mb-3">
              <g-link to="/news/11">
                <figure>
                  <g-image src="~/assets/news-img/11.jpg" width="255" height="150" />
                </figure>
                <h3 class="news-title">
                  Акция: переточка каждой четвертой фрезы бесплатно.
                </h3>
              </g-link>
            </div>
            <div class="mb-3">
              <g-link to="/news/10">
                <figure>
                  <g-image src="~/assets/news-img/10.jpg" width="255" height="150" />
                </figure>
                <h3 class="news-title">
                  Запущены в серийное производство центровочные сверла, фасонные фасочные фрезы серий 7V и 7R.
                </h3>
              </g-link>
            </div>
          </section>
        </aside>
      </div>
    </div>

    <app-footer />
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {

}
</script>

<style lang="scss">
.cc-news-section {
    @extend %grid-row-wrap;
    @include make-grid-gutter($col-selector: ".body, .aside");

    .body {
        ul li {
          margin-bottom: .5rem;
        }

        img {
          border-radius: 6px;
          border: 1px solid rgba(0,0,0,.1);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(16);
        }
    }

    .aside {
        @include media-breakpoint-up(lg) {
            @include make-col(8);
        }
    }
}
</style>
