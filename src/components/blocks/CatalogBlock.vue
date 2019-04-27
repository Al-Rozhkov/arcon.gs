<template>
  <section class="catalog-block">
    <article class="body col">
      <header>
        <h2>Каталог режущего инструмента Arconit™</h2>
      </header>

      <categories-list />

      <ul class="menu">
        <li>
          <a class="text-red" href="http://cvm-arcon.ru/uploaded/img/catalog/ARCONIT_full.pdf">
            Скачать каталог в&nbsp;PDF
          </a> <span class="text-muted">(15,6&nbsp;Mb)</span>
        </li>
        <li>
          <g-link class="text-red" to="/constructor">
            Онлайн конструктор инструмента по&nbsp;параметрам
          </g-link>
        </li>
      </ul>
    </article>

    <aside class="ill col">
      <g-image src="~/assets/img/catalog-block-teaser.jpg" />
    </aside>
  </section>
</template>

<script>
import CategoriesList from "~/components/catalog/CategoriesList"

export default {
  components: {
    CategoriesList
  }
}
</script>

<style lang="scss">
.catalog-block {
  @extend %grid-row-wrap;
  @include make-grid-gutter();

  align-items: flex-end;
  margin-bottom: 4rem;

  border-bottom: 1px solid gray("300");

  .ill {
    img {
      max-width: 100%;
      height: auto;
    }
  }

  .body {
    header {
      background: $white;
      // display: inline-block;
      margin: -3rem -15px 0;
      padding: 1rem;
      max-width: 500px;
    }
  }

  @include media-breakpoint-up(md) {
    border: 1px solid gray("300");
    border-radius: 6px;

    .ill {
      @include make-col(9);
      order: -1;
    }

    .body {
      @include make-col(15);
      order: 1;
    }
  }

  .menu {
    margin: 0 -15px .5rem 0;

    li {
      flex: 0 0 50%;
      margin-right: 0;
      padding: .3rem 1rem .3rem 0;
    }
  }

  h2 {
    @include media-breakpoint-up(lg) {
      font-size: 2.5rem;
      line-height: 1;
    }
  }
}
</style>
