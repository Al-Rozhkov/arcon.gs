<template>
  <page-layout>
    <main class="container">
      <series-page-header :node="$page.series" />

      <series-page-tabs :id="$page.series.id" />

      <div>
        <h2 class="mb-2">Калькулятор режимов резания</h2>

        <div class="mb-3">
          <!-- Применение -->
          <b-form-group :label="$page.tMatUsage.value" label-cols="auto" label-for="js-form-usage">
            <b-form-select id="js-form-usage" v-model="formUsage">
              <b-form-select-option-group label="Основное применение">
                <b-form-select-option v-for="item in $page.series.mainUsage" :key="item.id" :value="item.id">
                  {{ item.text }}
                </b-form-select-option>
              </b-form-select-option-group>
              <b-form-select-option-group label="Возможное применение">
                <b-form-select-option v-for="item in $page.series.possibleUsage" :key="item.id" :value="item.id">
                  {{ item.text }}
                </b-form-select-option>
              </b-form-select-option-group>
            </b-form-select>
          </b-form-group>

          <!-- Тип обработки -->
          <b-form-group label="Тип обработки" label-cols="auto" label-for="js-form-processing-type">
            <b-form-radio-group id="js-form-usage" v-model="formProcessingType" buttons
              button-variant="outline-secondary" name="js-form-processing-type">
              <b-form-radio value="groove">В паз</b-form-radio>
              <b-form-radio value="ledge">В уступ</b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <!-- Диаметр инструмента -->
          <b-form-group label="Диаметр инструмента (D)" label-cols="auto" label-for="js-form-diameter">
            <b-input-group append="мм.">
              <b-form-input v-model="formDiameter" name="js-form-diameter" type="number" min="0.01" step="0.01" />
            </b-input-group>
          </b-form-group>

          <!-- Количество зубьев -->
          <b-form-group label="Количество зубьев (Z)" label-cols="auto" label-for="js-cogs-number">
            <b-input-group append="шт.">
              <b-form-input v-model="formCogsNumber" name="js-cogs-number" type="number" min="1" step="1" />
            </b-input-group>
          </b-form-group>
        </div>

        <div class="tile-row">
          <div class="col-md-12 col-lg-10">
            <!-- Скорость резания -->
            <b-form-group label="Скорость резания (Vc)" label-cols="auto" label-for="js-cutting-speed">
              <b-input-group append="м/мин">
                <b-form-input v-model="formCuttingSpeed" name="js-cutting-speed" type="number" min="1" step="1" />
              </b-input-group>
            </b-form-group>

            <!-- Частота вращения -->
            <b-form-group label="Частота вращения (n)" label-cols="auto" label-for="js-rotational-speed">
              <b-input-group append="об/мин">
                <b-form-input v-model="formRotationalSpeed" name="js-rotational-speed" type="number" min="1" step="1" />
              </b-input-group>
            </b-form-group>

            <!-- Минутная подача -->
            <b-form-group label="Минутная подача (fv)" label-cols="auto" label-for="js-minute-pitch">
              <b-input-group append="мм/мин">
                <b-form-input v-model="formMinutePitch" name="js-minute-pitch" type="number" min="1" step="1" />
              </b-input-group>
            </b-form-group>

            <!-- Подача на оборот -->
            <b-form-group label="Подача на оборот (fn)" label-cols="auto" label-for="js-pitch-per-turn">
              <b-input-group append="мм/об">
                <b-form-input v-model="formPitchPerTurn" name="js-minute-pitch" type="number" min="0.001"
                  step="0.001" />
              </b-input-group>
            </b-form-group>

            <!-- Подача на зуб -->
            <b-form-group label="Подача на зуб (fz)" label-cols="auto" label-for="js-pitch-per-cog">
              <b-input-group append="мм/зуб">
                <b-form-input v-model="formPitchPerCog" name="js-minute-cog" type="number" min="0.001" step="0.001" />
              </b-input-group>
            </b-form-group>
          </div>
          <div class="col-md-12 col-lg-10">
            <!-- Глубина резания -->
            <b-form-group label="Глубина резания (ap)" label-cols="auto" label-for="js-form-cutting-depth">
              <b-input-group append="мм.">
                <b-form-input v-model="formCuttingDepth" name="js-form-cutting-depth" type="number" min="0.01"
                  step="0.01" />
              </b-input-group>
            </b-form-group>

            <!-- Ширина резания -->
            <b-form-group label="Ширина резания (ae)" label-cols="auto" label-for="js-form-cutting-width">
              <b-input-group append="мм.">
                <b-form-input v-model="formCuttingWidth" name="js-form-cutting-width" type="number" min="0.01"
                  step="0.01" />
              </b-input-group>
            </b-form-group>

            <!-- Длина обработки -->
            <b-form-group label="Длина обработки (l)" label-cols="auto" label-for="js-form-processing-length">
              <b-input-group append="мм.">
                <b-form-input v-model="formProcessingLength" name="js-form-processing-length" type="number" min="0.01"
                  step="0.01" />
              </b-input-group>
            </b-form-group>

            <!-- Время обработки -->
            <b-form-group label="Время обработки (t)" label-cols="auto" label-for="js-form-processing-time">
              <b-input-group append="мин.">
                <b-form-input :value="formProcessingTime" name="js-form-processing-time" type="number" disabled />
              </b-input-group>
            </b-form-group>
          </div>
        </div>




      </div>
    </main>
  </page-layout>
</template>

<page-query>
query EndMill($path: String, $id: String!) {
  series: productEndMill(path: $path) {
    title
    keywords
    id
    fusion
    photos(width: 800, quality: 75)
    content
    scheme {
      name
      scheme
    }
    mainUsage {
      id
      text
    }
    possibleUsage {
      id
      text
    }
    coating {
      text
    }
    tail
    endShapes {
      id
      text
    }
    cuttingShapes {
      id
      text
    }
    cogsPitch
    cogsNumber
    cogsCuttingCenter
    grooveInclination
    allowanceRadius
    allowanceCuttingDiameter
    productSeriesSet {
      set
    }
  }
  modes: allModeEndMill(
    filter: { series: { eq: $id } }
  ) {
    edges {
      node {
        id
        series
        type
        material
        kap
        kae
        nodes {
          d
          n
          fv
          fn
          ap
          ae
        }
      }
    }
  }
  tMatUsage: t(id: "catalog.filters.mat-usage") {
    value
  }
}
</page-query>

<script>
import PageLayout from '~/layouts/Catalog.vue'
import SeriesPageHeader from '~/components/catalog/SeriesPageHeader.vue'
import SeriesPageTabs from '~/components/catalog/SeriesPageTabs.vue'
import SeriesCuttingModes from '~/components/catalog/SeriesCuttingModes'
import {
  BFormGroup,
  BFormSelect,
  BFormSelectOption,
  BFormSelectOptionGroup,
  BFormRadioGroup,
  BFormRadio,
  BFormInput,
  BInputGroup,
} from 'bootstrap-vue'

export default {
  components: {
    PageLayout,
    SeriesPageHeader,
    SeriesPageTabs,
    SeriesCuttingModes,
    BFormGroup,
    BFormSelect,
    BFormSelectOption,
    BFormSelectOptionGroup,
    BFormRadioGroup,
    BFormRadio,
    BFormInput,
    BInputGroup,
  },

  data() {
    return {
      formUsage: null,
      formProcessingType: 'groove',
      formDiameter: null,
      formCogsNumber: null,
      formCuttingSpeed: null,
      formRotationalSpeed: null,
      formMinutePitch: null,
      formPitchPerTurn: null,
      formPitchPerCog: null,
      formCuttingDepth: null,
      formCuttingSpeed: null,
      formCuttingWidth: null,
      formProcessingLength: null,
    }
  },

  computed: {
    formProcessingTime() {
      return null
    }
  },

  created() {
    if (this.$page.series.mainUsage.length) {
      this.formUsage = this.$page.series.mainUsage[0].id;
    }
  },

  metaInfo() {
    const title = 'Калькулятор режимов резания ' + this.$page.series.title

    return {
      title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.series.content,
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: this.$page.series.keywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },
}
</script>
