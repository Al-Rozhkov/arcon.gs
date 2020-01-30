<template>
  <section class="block tile-row">
    <article class="col body">
      <header class="header">
        <h2 class="title">Онлайн-каталог режущего инструмента Arconit™</h2>
      </header>

      <section class="segment">
        <h3 class="h3">
          <g-link class="u" to="/catalog/end-mills">Концевые фрезы</g-link>
        </h3>
        <categories-list class />
      </section>

      <section class="segment">
        <app-menu>
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
        </app-menu>
      </section>

      <app-menu>
        <li class="li li-half">
          <h3 class="h3">
            <a
              class="text-red"
              href="/uploads/ARCONIT_full.pdf"
            >Скачать каталог в&nbsp;PDF&nbsp;</a>
            <span class="text-muted">(15,6&nbsp;Mb)</span>
          </h3>
        </li>
        <li class="li li-half">
          <h3 class="h3">
            <g-link
              class="text-red"
              to="/catalog/special"
            >Специальный инструмент</g-link>
          </h3>
        </li>
      </app-menu>
    </article>

    <aside class="col aside">
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
  align-items: flex-end;
  margin-bottom: 2rem;
  border-bottom: 1px solid $gray-300;
}

.h3 {
  font-weight: $font-weight-base;
  margin-bottom: 0.5rem;
}

a.u {
  @include link-underline();
}

.header {
  background: #ffffff;
  max-width: 28rem;
  margin-bottom: 2rem;
}

.aside,
.body {
  padding: 0 15px;
  width: 100%;
}

.segment {
  margin-bottom: 1.5rem;
}

img.ill-img {
  max-width: 100%;
  height: auto;
  margin: auto auto 0;
  padding-top: 1rem;
}

.menu {
  margin: 0 -15px 0 0;
}

li.li {
  padding-right: 1rem;
}

li.li-half {
  flex: 0 0 50%;
}

@include media-breakpoint-up(md) {
  .block {
    border: 1px solid gray('300');
    border-radius: 6px;
  }

  .header {
    margin: -3rem -15px 2rem;
    padding-left: 15px;
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
