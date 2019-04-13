<template>
  <Layout>
    <h1>News</h1>
    <ul>
      <!-- <li v-for="edge in $page.news.edges" :key="edge.node.id">
        <small>{{ edge.node.created }}</small>
        <g-link :to="'/news/' + edge.node.id">{{ edge.node.title }}</g-link>
      </li> -->
    </ul>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'News'
  }
}
</script>
