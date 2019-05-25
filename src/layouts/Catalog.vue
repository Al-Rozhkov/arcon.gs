<template>
  <div class="root">
    <div class="nav-header">
      <app-nav />
    </div>

    <section class="container-xl">
      <catalog-categories class="submenu" />
    </section>

    <slot />

    <svg-sprite-coating />
    <svg-sprite-features />

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
import CatalogCategories from '~/components/catalog/CatalogCategories'
import SvgSpriteCoating from '~/components/catalog/SvgSpriteCoating'
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'

export default {
  components: {
    CatalogCategories,
    SvgSpriteCoating,
    SvgSpriteFeatures
  },
}
</script>


<style lang="scss">
.catalog-list {
  margin: 0 -15px;

  @include media-breakpoint-up(lg) {
    margin: 0 -30px;
  }
}
</style>
