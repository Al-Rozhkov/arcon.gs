<template>
    <div class="cutting-calculator">
        <b-form-group label="Применение" label-cols="auto" label-for="js-calc-usage">
            <b-form-select
                id="js-calc-usage"
                :value="form.usage"
                :options="usageOptions"
                @change="onUsageChange"
            />
        </b-form-group>

        <b-form-group label="Тип обработки" label-cols="auto" label-for="js-calc-processing-type">
            <b-form-select
                id="js-calc-processing-type"
                :value="selectedProcessingType"
                @change="onProcessingTypeChange"
            >
                <b-form-select-option :value="NOT_SELECTED">— Не выбрано —</b-form-select-option>
                <b-form-select-option
                    v-for="option in processingTypeOptions"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.label }}
                </b-form-select-option>
            </b-form-select>
        </b-form-group>

        <b-form-group
            v-for="field in numericFields"
            :key="field.key"
            :label="fieldLabel(field)"
            label-cols="auto"
            :label-for="`js-calc-${field.key}`"
        >
            <b-input-group :append="field.unit || null">
                <!--
                    Обычный input, а не b-form-input: у того своё внутреннее
                    значение, которое рассинхронизируется с нашим откатом значения.
                -->
                <input
                    :id="`js-calc-${field.key}`"
                    class="form-control"
                    type="text"
                    inputmode="decimal"
                    autocomplete="off"
                    maxlength="12"
                    :value="form[field.key]"
                    :disabled="field.readonly"
                    @input="onNumericInput(field.key, $event)"
                    @change="onNumericBlur(field.key, $event)"
                />
            </b-input-group>
            <b-button
                v-if="field.key === 'cogs' && hasCogsCatalog"
                variant="outline-secondary"
                size="sm"
                class="mt-1"
                :disabled="!parseNum(form.diameter)"
                @click="onPickCogs"
            >
                Подобрать по каталогу
            </b-button>
        </b-form-group>
    </div>
</template>

<script>
import {
    BButton,
    BFormGroup,
    BFormSelect,
    BFormSelectOption,
    BInputGroup,
    BInputGroupAppend,
} from 'bootstrap-vue'
import {
    CALCULATOR_FIELDS,
    applyFieldReaction,
    createEmptyForm,
    fieldLabel,
    firstDiameter,
    formatNum,
    getField,
    parseNum,
    pickCogs,
    resolveModeGroup,
    resolveProcessingTypeOptions,
    sanitiseNumericInput,
    usageOptions,
} from '@/lib/calculator.js'

/**
 * Значение «тип обработки не выбран» в выпадающем списке. Отдельная строка нужна
 * потому, что пустой `type` каталога — это самостоятельный вариант
 * «Общие режимы резания», его нельзя смешивать с «ничего не выбрано».
 */
const NOT_SELECTED = '__not_selected__'

export default {
    components: {
        BButton,
        BFormGroup,
        BFormSelect,
        BFormSelectOption,
        BInputGroup,
        BInputGroupAppend,
    },

    props: {
        tools: {
            type: Array,
            required: true,
        },
        modes: {
            type: Array,
            required: true,
        },
    },

    data() {
        const form = createEmptyForm()

        return {
            NOT_SELECTED,
            form,
            // Последнее принятое значение каждого поля: к нему откатываемся,
            // если потеря фокуса оставило поле пустым или нулевым.
            accepted: Object.assign({}, form),
        }
    },

    computed: {
        /** Группы режимов серии без обёртки `edges`. */
        modeGroups() {
            return this.modes.map(({ node }) => node)
        },

        /** Инструменты серии без обёртки `edges`. */
        toolNodes() {
            return this.tools.map(({ node }) => node)
        },

        /**
         * `Z` есть не у всех типов инструментов: в таблице сверл его нет, и
         * подбором «по каталогу» там взяться неоткуда — поле остаётся ручным.
         */
        hasCogsCatalog() {
            return this.toolNodes.some((tool) => parseNum(tool.z) !== null)
        },

        usageOptions() {
            return usageOptions(this.modeGroups)
        },

        processingTypeOptions() {
            return resolveProcessingTypeOptions(this.modeGroups)
        },

        /**
         * Пустой `type` каталога — полноценный вариант «Общие режимы резания», а
         * «ничего не выбрано» — это `null`. Для `<select>` это разные значения,
         * поэтому невыбранное состояние отдаём отдельной строкой списка.
         */
        selectedProcessingType() {
            return this.form.processingType === null ? NOT_SELECTED : this.form.processingType
        },

        /** Поля 3…13: всё, что вводится цифрами. */
        numericFields() {
            return CALCULATOR_FIELDS.filter((field) => field.decimals !== undefined)
        },
    },

    created() {
        // «Изначально заполнено первым значением применения в таблице режимов»
        this.form.usage = this.usageOptions[0] || ''

        // «Если в серии 1 вариант, то в списке остается его»
        this.form.processingType =
            this.processingTypeOptions.length ? this.processingTypeOptions[0].value : null

        // Начальное значение поля 3 — первый диаметр серии. `accepted` синхронизируем
        // вручную: он снимается в `data()` до первого ввода, иначе очистка поля
        // откатила бы его в пустоту, а пустым поле 3 быть не может.
        const diameter = firstDiameter(this.toolNodes)
        if (diameter !== null) {
            this.form.diameter = formatNum(diameter, getField('diameter').decimals)
            this.accepted.diameter = this.form.diameter
        }

        // «Если поле 2) заполнено то выполняем Алгоритм заполнения режимов» —
        // с уже заполненными полями 1, 2 и 3 режимы переписываются сразу.
        if (this.form.diameter) {
            this.applyReaction('diameter')
        }
    },

    methods: {
        fieldLabel,

        parseNum,

        /**
         * Единственная точка входа для числового поля: чистим значение, пишем его
         * в состояние и прогоняем реакцию из спецификации. Watcher'ов нет намеренно —
         * из-за их порядка срабатывания прототип терял Vc.
         */
        onNumericInput(key, event) {
            const value = sanitiseNumericInput(event.target.value, getField(key).decimals)
            if (value === null) {
                // «сбрасывать к значению до»
                event.target.value = this.form[key]
                return
            }

            this.form[key] = value
            if (this.isAcceptable(key, value)) {
                this.accepted[key] = value
            }
            this.applyReaction(key)
        },

        /**
         * «Пустым или равным 0 поле сделать нельзя» — проверяем на уходе фокуса,
         * чтобы пользователь мог набрать «0,5» с нуля.
         */
        onNumericBlur(key, event) {
            const value = sanitiseNumericInput(event.target.value, getField(key).decimals)
            if (value !== null && this.isAcceptable(key, value)) {
                this.accepted[key] = value
                return
            }

            const restored = this.accepted[key]
            event.target.value = restored
            this.form[key] = restored
            this.applyReaction(key)
        },

        isAcceptable(key, value) {
            const field = getField(key)
            if (!field.restrict) {
                return true
            }
            const parsed = parseNum(value)
            return parsed !== null && parsed !== 0
        },

        onUsageChange(value) {
            this.form.usage = value
            this.applyReaction('usage')
        },

        onProcessingTypeChange(value) {
            this.form.processingType = value === NOT_SELECTED ? null : value
            this.applyReaction('processingType')
        },

        /** «Рядом разместить кнопку "Подобрать по каталогу"» (поле 4). */
        onPickCogs() {
            const cogs = pickCogs(this.toolNodes, this.form.diameter)
            if (cogs === null) {
                return
            }

            this.form.cogs = formatNum(cogs, 0)
            this.accepted.cogs = this.form.cogs
            this.applyReaction('cogs')
        },

        applyReaction(key) {
            const patch = applyFieldReaction(key, this.form, {
                group: resolveModeGroup(this.modeGroups, this.form.usage, this.form.processingType),
                tools: this.toolNodes,
            })
            Object.assign(this.form, patch)
        },
    },
}
</script>

<style lang="scss">
.cutting-calculator {
    max-width: 40rem;
}
</style>
