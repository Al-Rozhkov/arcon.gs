<template>
    <div>
        <div class="mb-3">
            <!-- Применение -->
            <b-form-group :label="$static.tMatUsage.value" label-cols="auto" label-for="js-form-usage">
                <b-form-select id="js-form-usage" v-model="formUsage" :options="formUsageOptions">
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

        <div v-if="currentDiameter" class="alert alert-info"><strong>Найдено по d:</strong> {{ currentDiameter }}</div>

        <div class="tile-row">
            <div class="col-md-12 col-lg-10">
                <!-- Скорость резания -->
                <b-form-group label="Скорость резания (Vc)" label-cols="auto" label-for="js-cutting-speed">
                    <b-input-group append="м/мин">
                        <b-form-input v-model="formCuttingSpeed" name="js-cutting-speed" type="number" min="1"
                            step="1" />
                    </b-input-group>
                </b-form-group>

                <!-- Частота вращения -->
                <b-form-group label="Частота вращения (n)" label-cols="auto" label-for="js-rotational-speed">
                    <b-input-group append="об/мин">
                        <b-form-input v-model="formRotationalSpeed" name="js-rotational-speed" type="number" min="1"
                            step="1" />
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
                        <b-form-input v-model="formPitchPerCog" name="js-minute-cog" type="number" min="0.001"
                            step="0.001" />
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
                        <b-form-input v-model="formProcessingLength" name="js-form-processing-length" type="number"
                            min="0.01" step="0.01" />
                    </b-input-group>
                </b-form-group>

                <!-- Время обработки -->
                <b-form-group label="Время обработки (t)" label-cols="auto" label-for="js-form-processing-time">
                    <b-input-group append="мин.">
                        <b-form-input :value="formProcessingTime" name="js-form-processing-time" type="number"
                            disabled />
                    </b-input-group>
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<static-query>
    {
      tMatUsage: t(id: "catalog.filters.mat-usage") {
        value
      }
    }
</static-query>

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

function closestDiameter(num, arr) {
    let currentRow = arr[0];
    let diff = Math.abs(num - currentRow.d);
    for (let val = 0; val < arr.length; val++) {
        const newdiff = Math.abs(num - arr[val].d);
        if (newdiff < diff) {
            diff = newdiff;
            currentRow = arr[val];
        }
    }
    return currentRow;
}

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

    props: {
        series: {
            type: Object,
            require: true,
        },
        modes: {
            type: Array,
            require: true,
        }
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
            formCuttingWidth: null,
            formProcessingLength: null,
        }
    },

    computed: {
        formProcessingTime() {
            return null
        },
        formUsageOptions() {
            const optionsSet = new Set()

            for (const mode of this.modes) {
                optionsSet.add(mode.node.material)
            }

            return Array.from(optionsSet)
        },
        currentDiameter() {
            if (!this.formDiameter || !this.formUsage || !this.formProcessingType) {
                return null
            }

            // Отсекаем по типу обработки и материалу
            const modeRecord = this.modes.find(({ node }) => node.material === this.formUsage && node.type === this.formProcessingType)
            if (!modeRecord) {
                return null
            }

            const tools = modeRecord.node.nodes.map(tool => ({
                ...tool,
                d: String(tool.d).replace(',', '.')
            }))
            const exactEqual = tools.find((tool) => tool.d == this.formDiameter)
            if (exactEqual) return exactEqual

            const roundEqual = tools.find((tool) => tool.d == Math.round(this.formDiameter))
            if (roundEqual) return roundEqual

            const formValueNumber = parseFloat(this.formDiameter)
            const dLess = Math.round(formValueNumber - 0.5)
            const dLessFound = tools.find((tool) => tool.d == dLess)
            if (dLessFound) return dLessFound

            const dMore = Math.round(formValueNumber + 0.5)
            const dMoreFound = tools.find((tool) => tool.d == dMore)
            if (dMoreFound) return dMoreFound

            const closest = closestDiameter(formValueNumber, tools)
            return closest
        }
    },

    created() {
        if (this.$page.series.mainUsage.length) {
            this.formUsage = this.$page.series.mainUsage[0].id;
        }
    },
}
</script>