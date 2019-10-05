<template>
  <div class="layout">
    <div class="container-xl d-print-none">
      <catalog-categories class="submenu" />
    </div>

    <slot />

    <svg-sprite-coating class="d-none" />
    <svg-sprite-features class="d-none" />
  </div>
</template>

<static-query>
query {
  metadata {
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
  }
}
</script>
