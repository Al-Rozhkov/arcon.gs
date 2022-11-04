<template>
  <Layout>
    <div class="agents-page">
      <main class="cnt">
        <h1>{{ $page.page.title }}</h1>

        <ClientOnly>
          <div class="mb-3">
            <b-form-radio-group
              id="radios-agents-country"
              :checked="countryFilter"
              :options="countryOptions"
              buttons
              button-variant="outline-secondary"
              name="radios-agents-country"
            ></b-form-radio-group>
          </div>

          <div class="agents-list">
            <div
              v-for="(agent, index) in agentsFiltered"
              :key="index"
              class="agent-card"
            >
              <h3 class="agent-title">{{ agent.name }}</h3>
              <p>{{ agent.countryText }}</p>
              <p>{{ agent.email }}</p>
              <div class="agent-card-more">
                <p>{{ agent.more }}</p>
              </div>
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
}
</page-query>

<script>
import ArconitSymbol from '@/components/ArconitSymbol.vue'
import { BFormRadioGroup } from 'bootstrap-vue'
import randomstring from 'randomstring'

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
          value: 0,
        },
        {
          text: 'Беларусь',
          value: 1,
        },
        {
          text: 'Казахстан',
          value: 2,
        },
      ]
    },

    /**
     * Список представителей
     */
    agentsList() {
      const getRandomInt = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      const agentsCountry = [
        'Представитель по России',
        'Представитель по Беларуси',
        'Представитель по Казахстану',
      ]

      return [...Array(12).keys()].map((i) => {
        const name = randomstring.generate({
          length: getRandomInt(5, 20),
          charset: 'alphabetic',
        })
        const countryIndex = getRandomInt(0, 2)

        const more = Array(getRandomInt(2, 7)).fill('').reduce((acc) => {
          const word = randomstring.generate({
            length: getRandomInt(2, 12),
            charset: 'alphabetic',
          })
          console.log(word)
          return acc + ' ' + word
        }, '')
  debugger

        return {
          name,
          country: countryIndex,
          countryText: agentsCountry[countryIndex],
          email: name.toLowerCase() + '@arconit.ru',
          more: '',
        }
      })
    },

    agentsFiltered() {
      return this.countryFilter !== null
        ? this.agentsList.filter((a) => a.country === this.countryFilter)
        : this.agentsList
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
  padding: 1.5rem 1.5rem 0.75rem;
  margin: -1.5rem -1.5rem -0.75rem;
  background-color: transparent;
  color: $black;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: lighten($yellow, 35%);
  }
}

.arconit-symbol {
  position: absolute;
  width: 65%;
  top: 10%;
  left: 45%;
  opacity: 0.1;
}
</style>
