<template>
  <div class="layout">
    <div class="container-xl d-print-none">
      <app-menu class="submenu">
        <app-menu-item
          v-for="{ node } in $static.menu.edges"
          :key="node.id"
          :to="node.path"
          :bold="node.bold"
          >{{ node.label }}</app-menu-item
        >
      </app-menu>
    </div>

    <slot />

    <svg-sprite-coating class="d-none" />
    <svg-sprite-features class="d-none" />

    <custom-tools-msg class="container-xl" />
  </div>
</template>

<static-query>
query {
  menu: allMenu(filter: { parent: { eq: "/catalog/" } }, sortBy: "weight", order: ASC) {
    edges {
      node {
        path
        label
        bold
        weight
        parent
      }
    }
  }
}
</static-query>

<script>
import SvgSpriteCoating from '~/components/catalog/SvgSpriteCoating'
import SvgSpriteFeatures from '~/components/catalog/SvgSpriteFeatures'
import CustomToolsMsg from '~/components/catalog/CustomToolsMsg'

export default {
  components: {
    SvgSpriteCoating,
    SvgSpriteFeatures,
    CustomToolsMsg
  },
}
</script>
