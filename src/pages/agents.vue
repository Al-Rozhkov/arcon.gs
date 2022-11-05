<template>
  <Layout>
    <div class="agents-page">
      <main class="cnt">
        <h1>{{ $page.page.title }}</h1>

        <ClientOnly>
          <div class="mb-3">
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
              v-for="(agent, index) in agentsFiltered"
              :key="index"
              class="agent-card"
            >
              <h3 class="agent-title">{{ agent.name }}</h3>
              <p>{{ agent.countryText }}</p>
              <p>
                E-mail:
                <a :href="`mailto:${agent.mail}`" class="u">{{
                  agent.email
                }}</a>
              </p>
              <p>Тел: +7 900 {{ agent.phone }}</p>
              <div class="agent-card-more">
                <div class="agent-card-more-content">
                  <p>Области: {{ agent.more }}</p>
                </div>
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

      return [...Array(20).keys()].map((i) => {
        const name = randomstring.generate({
          length: getRandomInt(5, 20),
          charset: 'alphabetic',
        })
        const getRandomPad = function (width) {
          const number = getRandomInt(0, Math.pow(10, width) - 1)
          return new Array(+width + 1 - (number + '').length).join('0') + number
        }
        const countryIndex = getRandomInt(0, 2)

        const more = Array(getRandomInt(3, 12))
          .fill('')
          .map(() =>
            randomstring.generate({
              length: getRandomInt(2, 12),
              charset: 'alphabetic',
            })
          )
          .join(' ')

        return {
          name,
          country: countryIndex,
          countryText: agentsCountry[countryIndex],
          email: name.toLowerCase() + '@arconit.ru',
          phone: `${getRandomPad(3)}-${getRandomPad(4)}`,
          more,
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
