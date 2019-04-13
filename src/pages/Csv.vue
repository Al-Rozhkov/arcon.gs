<template>
  <Layout>
    <h1>Каталог режущего инструмента Arconit CSV</h1>
    <ul>
      <li v-for="edge in $page.categories.edges" :key="edge.node.slug">
        <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Categories {
  categories: allProductCategory {
    edges {
      node {
        title
        path
        slug
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'News'
  }
}
</script>
