<template>
  <section class="block tile-row">
    <article class="col body">
      <header class="header">
        <h2 class="title">{{ $static.title.value }}</h2>
      </header>

      <section class="segment">
        <h3 class="h3">
          <g-link class="u" to="/catalog/end-mills/">{{ $static.cEndMills.value }}</g-link>
        </h3>
        <categories-list class />
      </section>

      <section class="segment">
        <app-menu>
          <li class="li">
            <h3 class="h3">
              <g-link class="u" to="/catalog/drills/?type=drills-center">{{ $static.cCenterDrills.value }}</g-link>
            </h3>
          </li>
          <li class="li">
            <h3 class="h3">
              <g-link class="u" to="/catalog/drills/?type=drills-spiral">{{ $static.cTwistDrills.value }}</g-link>
            </h3>
          </li>
          <li class="li">
            <h3 class="h3">
              <g-link class="u" to="/catalog/thread-mills/">{{ $static.cThreadMills.value }}</g-link>
            </h3>
          </li>
        </app-menu>
      </section>

      <app-menu>
        <li class="li li-half">
          <h3 class="h3">
            <a class="text-red" href="/uploads/arconit_full_2024.pdf">{{ $static.cDownload.value }}&nbsp;</a>
            <span class="text-muted">(15&nbsp;Mb)</span>
          </h3>
        </li>
        <li v-if="$route.path !== '/catalog/custom/'" class="li li-half">
          <h3 class="h3">
            <g-link class="text-red" to="/catalog/custom/">{{ $static.cCustomTools.value }}</g-link>
          </h3>
        </li>
      </app-menu>
    </article>

    <aside class="col aside">
      <g-image class="ill-img" src="~/assets/img/catalog-block-teaser.jpg" />
    </aside>
  </section>
</template>

<static-query>
query {
  title: t(id: "headline.catalog") {
    value
  }
  cEndMills: t(id: "catalog.end-mills") {
    value
  }
  cCenterDrills: t(id: "catalog.center-drills") {
    value
  }
  cTwistDrills: t(id: "catalog.twist-drills") {
    value
  }
  cThreadMills: t(id: "catalog.thread-mills") {
    value
  }
  cDownload: t(id: "catalog.download") {
    value
  }
  cCustomTools: t(id: "catalog.custom-tools") {
    value
  }
}
</static-query>

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
  margin-bottom: 1.25rem;
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

.li {
  padding-right: 1rem;
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

  .li-half {
    flex: 0 0 45%;
  }
}

@include media-breakpoint-up(lg) {
  h2.title {
    font-size: 2.2rem;
    line-height: 1;
  }
}
</style>
