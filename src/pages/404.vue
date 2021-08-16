<template>
  <Layout>
    <main class="cnt">
      <h1>Страница не найдена</h1>

      <div class="flex-row text-body">
        <div class="col-lg-16">
          <p>Возвращайтесь на <g-link to="/">главную страницу</g-link>.</p>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Ошибка 404. Страница не найдена',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Ошибка 404. Страница не найдена',
      },
    ],
  },
}
</script>
