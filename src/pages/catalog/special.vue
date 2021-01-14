<template>
  <Layout>
    <main class="cnt">
      <section class="mb-3">
        <h1>Специальный инструмент</h1>

        <div class="text-body">
          <p>Сухие цифры о наших производственных возможностях:</p>

          <ul>
            <li>
              Специальный инструмент составляет более 40% всех выпускаемых
              изделий;
            </li>
            <li>Количество специальных изделий – более 30 000 шт. в год;</li>
            <li>Минимальный размер заказа – 1 шт;</li>
            <li>
              Средний срок изготовления спец. инструмента без покрытия – 7 дней.
              С покрытием – 14 дней;
            </li>
            <li>
              Минимальный срок изготовления – 3 дня, максимальный – 3 недели
              (для особо сложных изделий).
            </li>
          </ul>

          <p>Все, что нужно сделать для расчета специального инструмента:</p>

          <ul>
            <li>выбрать эскиз и скачать его;</li>
            <li>
              заполнить эскиз (всплывающие подсказки помогут Вам) и переслать
              нам по электронной почте.
            </li>
          </ul>

          <p>
            Наилучшую совместимость эскизов обеспечивает
            <a href="https://acrobat.adobe.com/ru/ru/acrobat/pdf-reader.html"
              >Adobe Acrobat Reader</a
            >.
          </p>
        </div>

        <div
          v-for="(group, index) in output"
          :key="index"
          class="tile-row pb group"
        >
          <h3 class="col-lg-6 h3">{{ group.title }}</h3>
          <div class="col-lg-18">
            <a
              v-for="node in group.nodes"
              :key="node.id"
              class="s"
              :href="node.file.src"
              download
            >
              <h3 class="h3">
                <span class="u" v-html="node.title"></span>
              </h3>
              <p v-html="node.content"></p
            ></a>
          </div>
        </div>
      </section>

      <catalog-block />
    </main>
  </Layout>
</template>

<page-query>
query ProductSpecial {
  products: allProductSpecial(sortBy: "weight", order: ASC) {
    edges{
      node {
        id
        title
        group
        file
      }
    }
  }
}
</page-query>

<script>
import CatalogBlock from '~/components/blocks/CatalogBlock'

export default {
  components: {
    CatalogBlock,
  },

  computed: {
    output() {
      // Group nodes by given value
      return this.$page.products.edges.reduce((acc, { node }) => {
        if (!acc[node.group]) {
          acc[node.group] = {
            title: node.group,
            nodes: [],
          }
        }
        acc[node.group].nodes.push(node)

        return acc
      }, {})
    },
  },

  metaInfo: {
    title: 'Специальный инструмент',
  },
}
</script>

<style lang="scss" scoped>
.text-body {
  max-width: 860px;
  margin-bottom: 3.5rem;
}

.h3 {
  margin-top: 0;
  font-weight: $font-weight-base;
}

.group {
  border-bottom: 1px solid $gray-300;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 7rem;
    border-bottom: 0;
  }
}

.s {
  display: block;
  position: relative;
  padding-bottom: 0.75rem;
  background-color: #ffffff;
  color: $black;
}

.u {
  @include link-underline();
}

@include media-breakpoint-up(lg) {
  .h3 {
    font-size: 1.2rem;
  }

  /* .s {
    @include make-col(8);
  } */
}
</style>
