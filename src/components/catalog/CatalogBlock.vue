<template>
  <section>
    <h2>Каталог режущего инструмента Arconit</h2>
    <ul class="catalog-sections-menu">
      <li v-for="edge in $static.categories.edges" :key="edge.node.slug">
        <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
      </li>
    </ul>
  </section>
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

<script>

</script>

<style lang="scss">
.catalog-sections-menu {
  list-style-type: none;

  li {
    display: inline-block;
    padding: .5rem .75rem;
  }
}
</style>
