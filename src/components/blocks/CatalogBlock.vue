<template>
  <section class="ctlb-block">
    <article class="ctlb-body col">
      <header class="ctlb-header">
        <h2 class="ctlb-title">Каталог режущего инструмента Arconit™</h2>
      </header>

      <section>
        <h3 class="ctlb-menu">
          <g-link to="/catalog/end-mills">Концевые фрезы</g-link>
        </h3>
        <categories-list class="ctlb-menu" />
      </section>

      <ul class="ctlb-menu menu">
        <li>
          <h3>
            <g-link to="/catalog/drills">Сверла</g-link>
          </h3>
        </li>
        <li>
          <h3>
            <g-link to="/catalog/thread-mills">Резьбовые фрезы</g-link>
          </h3>
        </li>
      </ul>

      <ul class="ctlb-links">
        <li>
          <h3>
            <a
              class="text-red"
              href="http://cvm-arcon.ru/uploaded/img/catalog/ARCONIT_full.pdf"
            >Скачать каталог в&nbsp;PDF&nbsp;</a>
            <span class="text-muted">(15,6&nbsp;Mb)</span>
          </h3>
        </li>
        <li>
          <h3>
            <g-link
              class="text-red"
              to="/constructor"
            >Онлайн конструктор инструмента по&nbsp;параметрам</g-link>
          </h3>
        </li>
      </ul>
    </article>

    <aside class="ctlb-ill col">
      <g-image src="~/assets/img/catalog-block-teaser.jpg" />
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

<style lang="scss">
.ctlb-block {
  @extend %grid-row-wrap;
  @include make-grid-gutter();

  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 1px solid gray('300');

  section {
    margin-bottom: 1rem;
  }

  h3 {
    font-weight: $font-weight-base;
  }
}

.ctlb-header {
  background: $white;
  margin: -3rem -15px 0;
  padding: 1rem;
  max-width: 28rem;
}

.ctlb-ill {
  img {
    max-width: 100%;
    height: auto;
  }
}

.ctlb-menu {
  margin: 0 -15px 0.5rem 0;

  li {
    margin-right: 0;
    padding: 0.3rem 1rem 0.3rem 0;
  }

  a {
    @include link-underline();
  }
}

.ctlb-links {
  @extend %grid-row-wrap;
  list-style-type: none;
  margin: 1rem -15px 0.5rem 0;
  padding: 0;

  li {
    flex: 0 0 50%;
  }
}

@include media-breakpoint-up(md) {
  .ctlb-block {
    border: 1px solid gray('300');
    border-radius: 6px;
  }

  .ctlb-ill {
    @include make-col(9);
    order: -1;
  }

  .ctlb-body {
    @include make-col(15);
    order: 1;
  }
}

@include media-breakpoint-up(lg) {
  h2.ctlb-title {
    font-size: 2.2rem;
    line-height: 1;
  }
}
</style>
