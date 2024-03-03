<template>
  <Layout>
    <div class="agents-page">
      <main class="cnt">
        <h1>{{ $page.page.title }}</h1>

        <ClientOnly>
          <div class="mb-4">
            <b-form-radio-group
              id="radios-agents-country"
              v-model="countryFilter"
              :options="countryOptions"
              buttons
              button-variant="outline-secondary"
              name="radios-agents-country"
            ></b-form-radio-group>
          </div>

          <div class="agents-list">
            <div
              v-for="{ node } in agentsFiltered"
              :key="node.id"
              class="agent-card"
            >
              <h3 class="agent-title">{{ node.title }}</h3>
              <p>{{ node.text }}</p>
              <p v-if="node.city">{{ node.city }}</p>
              <p v-else>{{ node.text }}</p>
              <p v-if="node.email">
                E-mail:
                <a :href="`mailto:${node.email}`" class="u">{{
                  node.email
                }}</a>
              </p>
              <p v-if="node.phone">Тел: {{ node.phone }}</p>
            </div>
          </div>
        </ClientOnly>
      </main>

      <arconit-symbol class="arconit-symbol" />
    </div>
  </Layout>
</template>

<page-query>
query Page {
  page: mdPage(id: "agents") {
    id
    title
    description
    content
  }
  nodes: allAgent(order: ASC) {
    edges {
      node {
        id
        title
        text
        email
        phone
        city
        country
      }
    }
  }
}
</page-query>

<script>
import ArconitSymbol from '@/components/ArconitSymbol.vue'
import { BFormRadioGroup } from 'bootstrap-vue'

export default {
  components: {
    ArconitSymbol,
    BFormRadioGroup,
  },

  data: () => ({
    countryFilter: null,
  }),

  computed: {
    countryOptions() {
      return [
        {
          text: '— Все страны —',
          value: null,
        },
        {
          text: 'Россия',
          value: 'Россия',
        },
        {
          text: 'Беларусь',
          value: 'Беларусь',
        },
        {
          text: 'Казахстан',
          value: 'Казахстан',
        },
      ]
    },

    agentsFiltered() {
      return this.countryFilter !== null
        ? this.$page.nodes.edges.filter(({ node }) => node.country.includes(this.countryFilter))
        : this.$page.nodes.edges
    },
  },

  metaInfo() {
    return {
      title: this.$page.page.title,
      titleTemplate: null,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page.excerpt,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$page.page.title,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.agents-page {
  position: relative;
  padding-bottom: 6rem;
  overflow: hidden;
}

.agents-list {
  display: grid;
  gap: 2.5rem 2rem;
  grid-template-columns: repeat(4, 1fr);
}

.agent-title {
  margin-bottom: 1rem;
}

.agent-card {
  position: relative;
  padding: 1.5rem 1.5rem 0.5rem;
  margin: -1.5rem -1.5rem -0.75rem;
  background-color: transparent;
  color: $black;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: lighten($yellow, 35%);
    z-index: 20;
    box-shadow: $box-shadow-lg;

    .agent-card-more {
      display: block;
    }
  }

  &-more {
    display: none;
    position: relative;
    overflow: visible;

    &-content {
      position: absolute;
      padding: 0 1.5rem 0.75rem;
      left: -1.5rem;
      right: -1.5rem;
      top: 0;
      background-color: lighten($yellow, 35%);
    }
  }

  .u {
    @include link-underline();
  }
}

.arconit-symbol {
  position: absolute;
  width: 60%;
  top: -5rem;
  right: -15%;
  opacity: 0.07;
}
</style>
