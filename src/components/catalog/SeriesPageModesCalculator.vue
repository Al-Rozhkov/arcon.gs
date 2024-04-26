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

        <div class="debug-mode">
            <div v-if="currentDiameter" class="alert alert-info"><strong>Запись диаметра:</strong> {{ currentDiameter }}</div>
        </div>

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
                        <b-form-input
                            v-model="formCuttingWidth"
                            name="js-form-cutting-width"
                            type="number"
                            min="0.01"
                            step="0.01"
                            :disabled="formProcessingType === 'groove'"
                        />
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

function closestDiameter(num, arr, prop = 'd') {
    let currentRow = arr[0];
    let diff = Math.abs(num - currentRow[prop]);
    for (let val = 0; val < arr.length; val++) {
        const newdiff = Math.abs(num - arr[val][prop]);
        if (newdiff < diff) {
            diff = newdiff;
            currentRow = arr[val];
        }
    }
    return currentRow;
}

function strToFloat(value) {
    if (typeof value === 'number') {
        return value
    }
    return parseFloat(value.replace(/,/, '.'))
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
        tools: {
            type: Array,
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
            debugMode: true,
        }
    },

    computed: {
        formProcessingTime() {
            const l = this.formProcessingLength
            const fv = this.formMinutePitch
            if (!l || !fv) {
                return ''
            }
            return (l / fv).toFixed(2)
        },
        formUsageOptions() {
            const optionsSet = new Set()

            for (const mode of this.modes) {
                optionsSet.add(mode.node.material)
            }

            return Array.from(optionsSet)
        },
        /**
         * Запись группы режимов
         */
        currentModeRecord() {
            if (!this.formUsage || !this.formProcessingType) {
                return null
            }

            // Отсекаем по типу обработки и материалу
            const record =  this.modes.find(
                ({ node }) => node.material === this.formUsage && node.type === this.formProcessingType
            )
            return record ? record.node : null
        },
        /**
         * Запись о диаметре
         */
        currentDiameter() {
            if (!this.currentModeRecord || !this.formDiameter) {
                return null;
            }

            const tools = this.currentModeRecord.nodes.map(tool => ({
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
        },
        /**
         * Запись инструмента
         */
        currentTool() {
            if (!this.formDiameter) {
                return null;
            }

            const tools = this.tools.map(({ node }) => ({
                ...node,
                d: String(node.d1).replace(',', '.')
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

    watch: {
        currentTool(tool) {
            if (tool && !this.formCogsNumber) {
                this.formCogsNumber = this.currentTool.z
            }
        },
        /**
         * Watch fn to set fv
         */
        formPitchPerTurn(fnString) {
            if (!fnString || !this.currentDiameter) {
                return;
            }
            const n = Number(this.currentDiameter.n)
            const fn = strToFloat(fnString)
            const result = n * fn

            if (result) {
                this.formMinutePitch = result
            }
        },
        formPitchPerCog(fz) {
            if (!this.formPitchPerTurn && fz && this.formCogsNumber) {
                this.formPitchPerTurn = fz * Number(this.formCogsNumber)
            }
        },
        /**
         * Watch z to set fz
         */
        formCogsNumber(z) {
            if (!this.currentDiameter) {
                return;
            }
            const fnString = this.currentDiameter.fn.replace(/,/, '.')
            const result = parseFloat(fnString) / Number(z)
            if (result) {
                this.formPitchPerCog = result
            }
        },
        formRotationalSpeed(n) {
            if (!this.currentDiameter?.d || !n) {
                return
            }
            const result = Math.round(n * this.currentDiameter.d * Math.PI / 1000)
            this.formCuttingSpeed = result || ''
        },
        currentDiameter(value) {
            if (!value || !this.currentModeRecord) {
                return;
            }
            const { kap: kapString, kae: kaeString } = this.currentModeRecord
            const kap = strToFloat(kapString)
            const kae = strToFloat(kaeString)
            const fnString = value.fn.replace(/,/, '.')

            this.formRotationalSpeed = value.n
            this.formPitchPerTurn = fnString

            const ae = strToFloat(value.ae) * kae
            this.formCuttingWidth = ae ? ae.toFixed(2) : ''
            const ap = strToFloat(value.ap) * kap
            this.formCuttingDepth = ap ? ap.toFixed(2) : ''
        },
    },

    methods: {
        switchDebugMode() {
            this.debugMode = !this.debugMode
        },
    },

    created() {
        if (this.$page.series.mainUsage.length) {
            this.formUsage = this.$page.series.mainUsage[0].id;
        }
    },
}
</script>