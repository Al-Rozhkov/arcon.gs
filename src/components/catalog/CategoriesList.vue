<template>
  <app-menu v-once>
    <app-menu-item v-for="edge in $static.categories.edges" :key="edge.node.id" :to="edge.node.path">
      {{ edge.node.short }}
    </app-menu-item>
  </app-menu>
</template>

<static-query>
query CatalogMenu {
  categories: allProductCategory(sortBy: "weight", order: ASC) {
    edges {
      node {
        title
        short
        path
        id
      }
    }
  }
}
</static-query>
