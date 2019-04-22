<template>
  <ul class="catalog-categories-list menu">
    <li
      v-for="edge in $static.categories.edges"
      :key="edge.node.slug"
    >
      <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
    </li>
  </ul>
</template>

<static-query>
query CatalogMenu {
  categories: allProductCategory(sortBy: "weight", order: ASC) {
    edges {
      node {
        title
        path
        slug
      }
    }
  }
}
</static-query>
