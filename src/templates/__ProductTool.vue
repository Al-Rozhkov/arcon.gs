<template>
  <Layout>
    <h2>{{ $page.post.title }}</h2>

    <div v-html="$page.post.body.processed"></div>
  </Layout>
</template>

<page-query>
  query News ($id: String!) {
    post: drupalNodePerformance (id: $id) {
      title,
      path,
      body {
        processed
      }
      fieldPerformanceImage {
        title,
        uri {
          value,
          url
        }
      },
      # fieldTags {
      #   name,
      #   path
      # }
    }
  }
</page-query>

<script>
import Layout from '~/layouts/Default.vue'
export default {
  components: {
    Layout
  },
  metaInfo () {
    return {
      title: 'Заголовок новости'
    }
  }
}
</script>
