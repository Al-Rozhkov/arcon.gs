/**
 * Логика калькулятора режимов резания.
 *
 * Функциональная спецификация — `calculator.xlsx`, лист «Лист1».
 * Все функции чистые: ни Vue, ни DOM. Каталог приходит из Google Sheets
 * сырыми строками, поэтому единственный путь от текста к числу — `parseNum`.
 */

const THOUSANDS_SEPARATOR = /\s/g
const VECTOR_MATERIAL_SUFFIX = /\s*\.?\s*Vc\s*=[\s\S]*$/

/**
 * Разбирает значение каталога в число.
 * `«40 000» → 40000`, `«1 080» → 1080`, `«0,032» → 0.032`, `«1,5» → 1.5`.
 * Пустое и нечисловое значение даёт `null`.
 */
export function parseNum(raw) {
    if (typeof raw === 'number') {
        return Number.isFinite(raw) ? raw : null
    }
    if (typeof raw !== 'string') {
        return null
    }

    const normalized = raw.replace(THOUSANDS_SEPARATOR, '').replace(',', '.')
    if (!/^\d+(\.\d*)?$/.test(normalized)) {
        return null
    }

    const value = Number(normalized)
    return Number.isFinite(value) ? value : null
}

/**
 * Число в строку с запятой в качестве десятичного разделителя.
 * `formatNum(0.032, 3) === '0,032'`
 */
export function formatNum(value, decimals = 0) {
    const number = typeof value === 'number' ? value : parseNum(value)
    if (number === null) {
        return ''
    }
    return number.toFixed(decimals).replace('.', ',')
}

/**
 * Отбрасывает хвост `«. Vc = 150 м/мин»` и любые табы/переводы строк из ячейки
 * «Применение», схлопывая пробелы.
 */
export function cleanMaterial(raw) {
    if (typeof raw !== 'string') {
        return ''
    }
    return raw.replace(VECTOR_MATERIAL_SUFFIX, '').replace(/\s+/g, ' ').trim()
}

/**
 * «При вводе в поле значения со знаками, отличными от цифр, должно сбрасывать
 * к значению до. При вводе в поле значения цифр с точкой, меняем точку на запятую.»
 *
 * `null` — в поле попал не цифровой символ, значение надо откатить.
 * Иначе возвращается то, что имеет смысл записать в поле: точка заменена на
 * запятую, дробная часть подрезана до точности поля.
 */
export function sanitiseNumericInput(raw, decimals = 0) {
    const candidate = String(raw).replace(/\./g, ',')
    if (!/^\d*(,\d*)?$/.test(candidate)) {
        return null
    }
    if (decimals <= 0) {
        return candidate.split(',')[0]
    }

    const [digits, fraction] = candidate.split(',')
    return fraction ? `${digits},${fraction.slice(0, decimals)}` : candidate
}

/**
 * Подписи типов обработки. Пустой `type` в каталоге — это «общие режимы резания»,
 * та же трактовка, что и заголовок на странице режимов резания.
 */
export const PROCESSING_TYPES = {
    '': 'Общие режимы резания',
    ledge: 'В уступ',
    groove: 'В паз',
}

/**
 * Варианты поля 2 — только те типы обработки, которые реально есть в серии.
 * Без этого восемь серий с пустым `type` останутся без единого варианта.
 */
export function resolveProcessingTypeOptions(groups) {
    const types = []

    for (const group of groups || []) {
        const type = group.type || ''
        if (!types.includes(type)) {
            types.push(type)
        }
    }

    return types.map((type) => ({ value: type, label: PROCESSING_TYPES[type] || type }))
}

/**
 * Варианты поля 1. Ключом служит очищенная подпись, а не сырой `material`:
 * у групп «в уступ» и «в паз» одна и та же подпись встречается дважды.
 */
export function usageOptions(groups) {
    const labels = []

    for (const group of groups || []) {
        const label = cleanMaterial(group.material)
        if (label && !labels.includes(label)) {
            labels.push(label)
        }
    }

    return labels
}

/**
 * Группа режимов по подписи применения и типу обработки. Обе части обязательны:
 * подпись без типа неоднозначна.
 */
export function resolveModeGroup(groups, usage, processingType) {
    if (!usage || processingType === null || processingType === undefined) {
        return null
    }

    return (
        (groups || []).find(
            (group) => cleanMaterial(group.material) === usage && (group.type || '') === processingType
        ) || null
    )
}

/**
 * «Алгоритм поиска строки режимов по D» (и «Алгоритм подбора Z по D» — тот же).
 * 1) точное совпадение; 2) Math.round(D); 3) Math.round(D − 0,5);
 * 4) Math.round(D + 0,5); 5) ближайшее меньшее; 6) ближайшее большее.
 */
export function lookupRow(rows, d, key) {
    const target = parseNum(d)
    if (target === null) {
        return null
    }

    const candidates = (rows || [])
        .map((row) => ({ row, value: parseNum(row[key]) }))
        .filter((candidate) => candidate.value !== null)

    if (!candidates.length) {
        return null
    }

    const rounded = [Math.round(target), Math.round(target - 0.5), Math.round(target + 0.5)]
    for (const value of [target].concat(rounded)) {
        const hit = candidates.find((candidate) => candidate.value === value)
        if (hit) {
            return hit.row
        }
    }

    const smaller = candidates
        .filter((candidate) => candidate.value < target)
        .sort((a, b) => b.value - a.value)
    if (smaller.length) {
        return smaller[0].row
    }

    const larger = candidates
        .filter((candidate) => candidate.value > target)
        .sort((a, b) => a.value - b.value)
    return larger.length ? larger[0].row : null
}

export function lookupTool(tools, d) {
    return lookupRow(tools, d, 'd1')
}

/**
 * `z` живёт только в таблице инструментов серии. Дубликаты `d1` (угол/радиус
 * версии) не мешают: `z` в пределах серии постоянен, берём первую строку.
 */
export function pickCogs(tools, d) {
    const row = lookupTool(tools, d)
    return row ? parseNum(row.z) : null
}

/**
 * Первый диаметр серии — начальное значение поля 3. Берём первую строку с
 * разбираемым `d1`, поэтому дубликаты `d1` (угол/радиус версии) не мешают —
 * так же, как в `pickCogs`. Порядок строк таблицы инструментов не меняем.
 * `null` — в серии нет ни одного пригодного диаметра.
 */
export function firstDiameter(tools) {
    for (const tool of tools || []) {
        const value = parseNum(tool.d1)
        if (value !== null) {
            return value
        }
    }
    return null
}

/**
 * Тринадцать полей калькулятора в порядке таблицы-спецификации.
 *
 * `restrict` — поля 3…9 нельзя сделать пустыми или нулевыми («Пустым или равным 0
 * поле сделать нельзя»). У полей 10…12 спецификация прямо пишет «Без каких-либо
 * ограничений», иначе ap/ae/l нельзя было бы ни очистить, ни обнулить вручную.
 */
export const CALCULATOR_FIELDS = [
    { key: 'usage', label: 'Применение', symbol: '', unit: '', optional: false, readonly: false },
    { key: 'processingType', label: 'Тип обработки', symbol: '', unit: '', optional: true, readonly: false },
    { key: 'diameter', label: 'Диаметр инструмента', symbol: 'D', unit: 'мм', decimals: 2, restrict: true },
    { key: 'cogs', label: 'Количество зубьев', symbol: 'Z', unit: 'шт', decimals: 0, restrict: true },
    { key: 'cuttingSpeed', label: 'Скорость резания', symbol: 'Vc', unit: 'м/мин', decimals: 0, restrict: true },
    { key: 'rotationalSpeed', label: 'Частота вращения', symbol: 'n', unit: 'об/мин', decimals: 0, restrict: true },
    { key: 'minutePitch', label: 'Минутная подача', symbol: 'fv', unit: 'мм/мин', decimals: 0, restrict: true },
    { key: 'pitchPerTurn', label: 'Подача на оборот', symbol: 'fn', unit: 'мм/об', decimals: 3, restrict: true },
    { key: 'pitchPerCog', label: 'Подача на зуб', symbol: 'fz', unit: 'мм/зуб', decimals: 3, restrict: true },
    { key: 'cuttingDepth', label: 'Глубина резания', symbol: 'ap', unit: 'мм', decimals: 2, restrict: false },
    { key: 'cuttingWidth', label: 'Ширина резания', symbol: 'ae', unit: 'мм', decimals: 2, restrict: false },
    { key: 'processingLength', label: 'Длина обработки', symbol: 'l', unit: 'мм', decimals: 2, restrict: false },
    { key: 'processingTime', label: 'Время обработки', symbol: 't', unit: 'мин', decimals: 2, readonly: true },
]

export function getField(key) {
    return CALCULATOR_FIELDS.find((field) => field.key === key)
}

export function fieldLabel(field) {
    return field.symbol ? `${field.label} (${field.symbol})` : field.label
}

/** Пустая форма. Все значения — строки, чтобы частичный ввод («0,») не терялся. */
export function createEmptyForm() {
    const form = {}
    for (const field of CALCULATOR_FIELDS) {
        form[field.key] = ''
    }
    form.processingType = null
    return form
}

/**
 * Пишет значение в поле состояния и в патч, округляя по точности поля.
 * Округление происходит ДО следующей формулы: `fv = fn * n` в спецификации
 * считается от уже округлённой `fn`, поэтому результат закономерно отличается от
 * колонки `fv` в самом каталоге. Не «исправляйте» это.
 */
function write(state, patch, key, value, decimals) {
    const formatted = formatNum(value, decimals)
    state[key] = formatted
    patch[key] = formatted
}

function clear(state, patch, key) {
    state[key] = ''
    patch[key] = ''
}

const num = (state, key) => parseNum(state[key])
const has = (state, key) => parseNum(state[key]) !== null
const typeSelected = (state) => state.processingType !== null && state.processingType !== undefined

/**
 * «Алгоритм заполнения режимов» с полями 5, 7, 8 и 9.
 */
export function applyFillModes(state, ctx = {}) {
    const patch = {}
    const group = ctx.group
    const diameter = parseNum(state.diameter)

    if (!group || !Array.isArray(group.nodes) || diameter === null) {
        return patch
    }

    const row = lookupRow(group.nodes, diameter, 'd')
    if (!row) {
        return patch
    }

    const view = Object.assign({}, state)
    const n = parseNum(row.n)
    const fn = parseNum(row.fn)

    // n и fn приходят из строки режимов
    if (n !== null) {
        write(view, patch, 'rotationalSpeed', n, 0)
    }
    if (fn !== null) {
        write(view, patch, 'pitchPerTurn', fn, 3)
    }

    // ap и ae считаются от коэффициентов группы. Если коэффициента нет
    // (восемь серий и все группы «в паз»), поле остаётся ручным.
    const kap = parseNum(group.kap)
    if (kap !== null) {
        write(view, patch, 'cuttingDepth', kap * diameter, 2)
    }
    const kae = parseNum(group.kae)
    if (kae !== null) {
        write(view, patch, 'cuttingWidth', kae * diameter, 2)
    }

    if (has(view, 'rotationalSpeed')) {
        write(view, patch, 'cuttingSpeed', num(view, 'rotationalSpeed') * diameter * Math.PI / 1000, 0)
    }
    if (has(view, 'pitchPerTurn') && has(view, 'rotationalSpeed')) {
        write(view, patch, 'minutePitch', num(view, 'pitchPerTurn') * num(view, 'rotationalSpeed'), 0)
    }

    if (!has(view, 'cogs')) {
        const cogs = pickCogs(ctx.tools, diameter)
        if (cogs !== null) {
            write(view, patch, 'cogs', cogs, 0)
        }
    }

    if (has(view, 'pitchPerTurn') && has(view, 'cogs')) {
        write(view, patch, 'pitchPerCog', num(view, 'pitchPerTurn') / num(view, 'cogs'), 3)
    }

    return patch
}

/**
 * Блок «если поле 8) заполнено, то fv = fn * n; иначе если поле 7) заполнено, то
 * fn = fv / n, а поле 9) считается от Z либо очищается».
 */
function deriveFeed(state, patch) {
    const fn = num(state, 'pitchPerTurn')
    const n = num(state, 'rotationalSpeed')

    if (fn !== null) {
        if (n !== null) {
            write(state, patch, 'minutePitch', fn * n, 0)
        }
        return
    }

    const fv = num(state, 'minutePitch')
    if (fv === null || n === null) {
        return
    }

    write(state, patch, 'pitchPerTurn', fv / n, 3)
    derivePitchPerCog(state, patch)
}

/**
 * Блок «если поле 4) заполнено, то fz = fn / Z; иначе удаляем значение поля 9)».
 */
function derivePitchPerCog(state, patch) {
    const cogs = num(state, 'cogs')
    if (cogs === null || !has(state, 'pitchPerTurn')) {
        clear(state, patch, 'pitchPerCog')
        return
    }
    write(state, patch, 'pitchPerCog', num(state, 'pitchPerTurn') / cogs, 3)
}

/**
 * Блок «если поле 3) пустое, то удаляем значение поля 5); иначе Vc = n * D * Пи / 1000».
 */
function deriveCuttingSpeed(state, patch) {
    const diameter = num(state, 'diameter')
    if (diameter === null) {
        clear(state, patch, 'cuttingSpeed')
        return
    }
    write(state, patch, 'cuttingSpeed', num(state, 'rotationalSpeed') * diameter * Math.PI / 1000, 0)
}

/**
 * Реакция на ввод в конкретное поле — колонка «Реакция на ввод» спецификации,
 * строка за строкой. Возвращает патч полей, которые надо переписать.
 *
 * В `state` уже записано новое значение `fieldKey`. Промежуточные результаты
 * формул попадают в `patch` и тут же читаются из локальной копии состояния, а не
 * из реактивного объекта компоненты: никаких watcher'ов, порядок событий не важен.
 */
export function applyFieldReaction(fieldKey, state, ctx = {}) {
    const view = Object.assign({}, state)
    const patch = {}

    switch (fieldKey) {
        // 1) Применение: если заполнены поля 2 и 3 — полностью переписать режимы
        case 'usage':
            if (typeSelected(view) && has(view, 'diameter')) {
                Object.assign(patch, applyFillModes(view, ctx))
            }
            break

        // 2) Тип обработки: если заполнено поле 3 — полностью переписать режимы
        case 'processingType':
            if (typeSelected(view) && has(view, 'diameter')) {
                Object.assign(patch, applyFillModes(view, ctx))
            }
            break

        // 3) Диаметр инструмента
        case 'diameter':
            if (typeSelected(view)) {
                Object.assign(patch, applyFillModes(view, ctx))
                break
            }
            if (has(view, 'cuttingSpeed')) {
                write(view, patch, 'rotationalSpeed',
                    num(view, 'cuttingSpeed') * 1000 / (num(view, 'diameter') * Math.PI), 0)
                deriveFeed(view, patch)
            } else if (has(view, 'rotationalSpeed')) {
                write(view, patch, 'cuttingSpeed',
                    num(view, 'rotationalSpeed') * num(view, 'diameter') * Math.PI / 1000, 0)
            }
            break

        // 4) Количество зубьев
        case 'cogs': {
            const cogs = num(view, 'cogs')
            if (!cogs) {
                break
            }
            if (has(view, 'pitchPerTurn')) {
                write(view, patch, 'pitchPerCog', num(view, 'pitchPerTurn') / cogs, 3)
            } else if (has(view, 'pitchPerCog')) {
                write(view, patch, 'pitchPerTurn', num(view, 'pitchPerCog') * cogs, 3)
                if (has(view, 'rotationalSpeed')) {
                    write(view, patch, 'minutePitch', num(view, 'pitchPerTurn') * num(view, 'rotationalSpeed'), 0)
                }
            }
            break
        }

        // 5) Скорость резания
        case 'cuttingSpeed':
            if (!has(view, 'diameter')) {
                clear(view, patch, 'rotationalSpeed')
            } else {
                write(view, patch, 'rotationalSpeed',
                    num(view, 'cuttingSpeed') * 1000 / (num(view, 'diameter') * Math.PI), 0)
                deriveFeed(view, patch)
            }
            break

        // 6) Частота вращения
        case 'rotationalSpeed':
            if (!has(view, 'diameter')) {
                clear(view, patch, 'cuttingSpeed')
            } else {
                write(view, patch, 'cuttingSpeed',
                    num(view, 'rotationalSpeed') * num(view, 'diameter') * Math.PI / 1000, 0)
            }
            deriveFeed(view, patch)
            break

        // 7) Минутная подача — два независимых блока, а не «if / else if»
        case 'minutePitch':
            if (num(view, 'rotationalSpeed') === null) {
                if (has(view, 'pitchPerTurn')) {
                    write(view, patch, 'rotationalSpeed', num(view, 'minutePitch') / num(view, 'pitchPerTurn'), 0)
                    deriveCuttingSpeed(view, patch)
                }
            } else {
                write(view, patch, 'pitchPerTurn', num(view, 'minutePitch') / num(view, 'rotationalSpeed'), 3)
                derivePitchPerCog(view, patch)
            }
            break

        // 8) Подача на оборот — независимые блоки
        case 'pitchPerTurn':
            if (num(view, 'rotationalSpeed') === null) {
                if (has(view, 'minutePitch')) {
                    write(view, patch, 'rotationalSpeed', num(view, 'minutePitch') / num(view, 'pitchPerTurn'), 0)
                    deriveCuttingSpeed(view, patch)
                }
            } else {
                write(view, patch, 'minutePitch', num(view, 'pitchPerTurn') * num(view, 'rotationalSpeed'), 0)
            }
            derivePitchPerCog(view, patch)
            break

        // 9) Подача на зуб
        case 'pitchPerCog': {
            const cogs = num(view, 'cogs')
            if (cogs === null) {
                clear(view, patch, 'pitchPerTurn')
                break
            }
            write(view, patch, 'pitchPerTurn', num(view, 'pitchPerCog') * cogs, 3)
            if (has(view, 'rotationalSpeed')) {
                write(view, patch, 'minutePitch', num(view, 'pitchPerTurn') * num(view, 'rotationalSpeed'), 0)
            } else if (has(view, 'minutePitch')) {
                write(view, patch, 'rotationalSpeed', num(view, 'minutePitch') / num(view, 'pitchPerTurn'), 0)
                deriveCuttingSpeed(view, patch)
            }
            break
        }

        // 10) ap, 11) ae — только ручной ввод, автозаполнение делает applyFillModes
        // 12) l — ручной ввод без реакции
        // 13) t — только чтение
        default:
            break
    }

    // 13) Время обработки: пересчитывается при изменении полей 7 и 12.
    // «если введено не число (а например "" т.е. пустое), то считать значение
    // ячейки = 0».
    if (fieldKey === 'processingLength' || 'minutePitch' in patch) {
        const merged = Object.assign({}, state, patch)
        const length = num(merged, 'processingLength') || 0
        const minutePitch = num(merged, 'minutePitch') || 0
        patch.processingTime = formatNum(minutePitch ? length / minutePitch : 0, 2)
    }

    return patch
}
