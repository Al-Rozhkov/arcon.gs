<template>
  <section class="block">
    <article class="body col">
      <header class="header">
        <h2 class="title">Каталог режущего инструмента Arconit™</h2>
      </header>

      <section class="segment">
        <h3 class="h3">
          <g-link class="u" to="/catalog/end-mills">Концевые фрезы</g-link>
        </h3>
        <categories-list class="ctlb-menu" />
      </section>

      <section class="segment">
        <ul class="ctlb-menu menu">
          <li class="li">
            <h3 class="h3">
              <g-link class="u" to="/catalog/drills">Сверла</g-link>
            </h3>
          </li>
          <li class="li">
            <h3 class="h3">
              <g-link class="u" to="/catalog/thread-mills">Резьбовые фрезы</g-link>
            </h3>
          </li>
        </ul>
      </section>

      <section class="segment">
        <ul class="links">
          <li class="li-half">
            <h3 class="h3">
              <a
                class="text-red"
                href="http://cvm-arcon.ru/uploaded/img/catalog/ARCONIT_full.pdf"
              >Скачать каталог в&nbsp;PDF&nbsp;</a>
              <span class="text-muted">(15,6&nbsp;Mb)</span>
            </h3>
          </li>
          <li class="li-half">
            <h3 class="h3">
              <g-link
                class="text-red"
                to="/constructor"
              >Онлайн конструктор инструмента по&nbsp;параметрам</g-link>
            </h3>
          </li>
        </ul>
      </section>
    </article>

    <aside class="aside col">
      <g-image class="ill-img" src="~/assets/img/catalog-block-teaser.jpg" />
    </aside>
  </section>
</template>

<script>
import CategoriesList from '~/components/catalog/CategoriesList'

export default {
  components: {
    CategoriesList
  }
}
</script>

<style lang="scss" scoped>
.block {
  @extend %grid-row-wrap;
  @include make-grid-gutter();

  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 1px solid gray('300');
}

.h3 {
  font-weight: $font-weight-base;
}

a.u {
  @include link-underline();
}

.header {
  background: #ffffff;
  margin: -3rem -15px 0;
  padding: 1rem;
  max-width: 28rem;
}

.segment {
  margin-bottom: 1rem;
}

img.ill-img {
  max-width: 100%;
  height: auto;
}

.ctlb-menu {
  margin: 0 -15px 0.5rem 0;

  li.li {
    margin-right: 0;
    padding: 0.3rem 1rem 0.3rem 0;
  }
}

.links {
  @extend %grid-row-wrap;
  list-style-type: none;
  margin: 1rem -15px 0.5rem 0;
  padding: 0;

  li.li-half {
    flex: 0 0 50%;
  }
}

@include media-breakpoint-up(md) {
  .block {
    border: 1px solid gray('300');
    border-radius: 6px;
  }

  .aside {
    @include make-col(9);
    order: -1;
  }

  .body {
    @include make-col(15);
    order: 1;
  }
}

@include media-breakpoint-up(lg) {
  h2.title {
    font-size: 2.2rem;
    line-height: 1;
  }
}
</style>
