import {
    applyFieldReaction,
    applyFillModes,
    cleanMaterial,
    createEmptyForm,
    firstDiameter,
    formatNum,
    lookupRow,
    parseNum,
    pickCogs,
    resolveModeGroup,
    resolveProcessingTypeOptions,
    sanitiseNumericInput,
    usageOptions,
} from '@/lib/calculator.js'

const LEDGE_MATERIAL = 'Углеродистые и легированные стали, чугун (< 30HRC)'
const STAINLESS_MATERIAL = 'Нержавеющие стали'

/**
 * Фрагмент реальных данных серии 1C002: у «уступа» и «паза» один и тот же
 * материал встречается дважды и отличается только хвостом «Vc = … м/мин».
 */
const MODES_1C002 = [
    {
        id: '7',
        series: '1c002',
        type: 'ledge',
        material: `${LEDGE_MATERIAL}. Vc = 150 м/мин\t\t\t\t\r`,
        kap: '1,5',
        kae: '0,2',
        nodes: [
            { d: '1', n: '40 000', fv: '810', fn: '0,02', ap: '1,5', ae: '0,20' },
            { d: '1,5', n: '28 000', fv: '900', fn: '0,032', ap: '2,3', ae: '0,30' },
            { d: '3', n: '15 000', fv: '1 130', fn: '0,075', ap: '4,5', ae: '0,60' },
            { d: '4', n: '11 000', fv: '1 260', fn: '0,115', ap: '6', ae: '0,80' },
            { d: '5', n: '9 600', fv: '1 730', fn: '0,18', ap: '7,5', ae: '1,00' },
        ],
    },
    {
        id: '8',
        series: '1c002',
        type: 'ledge',
        material: `${STAINLESS_MATERIAL}. Vc = 100 м/мин\t\t\t\t\r`,
        kap: '1,5',
        kae: '0,1',
        nodes: [{ d: '4', n: '9 200', fv: '730', fn: '0,08', ap: '4', ae: '0,40' }],
    },
    {
        id: '13',
        series: '1c002',
        type: 'groove',
        material: `${LEDGE_MATERIAL}. Vc = 125 м/мин                            \n`,
        kap: '1',
        kae: '',
        nodes: [{ d: '4', n: '9 200', fv: '730', fn: '0,08', ap: '4', ae: '' }],
    },
]

const TOOLS_1C002 = [
    { id: 'a', d1: '3', z: '4' },
    { id: 'b', d1: '3', z: '4' },
    { id: 'c', d1: '3', z: '4' },
    { id: 'd', d1: '4', z: '4' },
    { id: 'e', d1: '4', z: '4' },
    { id: 'f', d1: '5', z: '4' },
]

const form = (values) => Object.assign(createEmptyForm(), values)

describe('parseNum', () => {
    test('разбирает разделители тысяч пробелом', () => {
        expect(parseNum('40 000')).toBe(40000)
        expect(parseNum('1 080')).toBe(1080)
        expect(parseNum('11 000')).toBe(11000)
    })

    test('разбирает запятую как десятичный разделитель', () => {
        expect(parseNum('0,032')).toBe(0.032)
        expect(parseNum('1,5')).toBe(1.5)
        expect(parseNum('0,115')).toBe(0.115)
    })

    test('пропускает числа без преобразования', () => {
        expect(parseNum(12.5)).toBe(12.5)
        expect(parseNum(0)).toBe(0)
    })

    test('возвращает null на пустое и нечисловое значение', () => {
        expect(parseNum('')).toBeNull()
        expect(parseNum(null)).toBeNull()
        expect(parseNum(undefined)).toBeNull()
        expect(parseNum('-5')).toBeNull()
        expect(parseNum('—')).toBeNull()
        expect(parseNum(NaN)).toBeNull()
    })
})

describe('formatNum', () => {
    test('печатает запятую и указанную точность', () => {
        expect(formatNum(0.032, 3)).toBe('0,032')
        expect(formatNum(138.23, 0)).toBe('138')
        expect(formatNum(6, 2)).toBe('6,00')
        expect(formatNum(0.02875, 3)).toBe('0,029')
    })

    test('пустое значение даёт пустую строку', () => {
        expect(formatNum(null)).toBe('')
        expect(formatNum('abc')).toBe('')
    })
})

describe('cleanMaterial', () => {
    test('отбрасывает хвост «Vc = … м/мин» и переводы строк', () => {
        expect(cleanMaterial(`${LEDGE_MATERIAL}. Vc = 150 м/мин\t\t\t\t\r`)).toBe(LEDGE_MATERIAL)
        expect(cleanMaterial(`${STAINLESS_MATERIAL}. Vc = 70 м/мин\n`)).toBe(STAINLESS_MATERIAL)
        expect(cleanMaterial(`${STAINLESS_MATERIAL}. Vc = 75 м/мин\r\n`)).toBe(STAINLESS_MATERIAL)
    })

    test('чистую подпись не трогает', () => {
        expect(cleanMaterial(LEDGE_MATERIAL)).toBe(LEDGE_MATERIAL)
        expect(cleanMaterial(null)).toBe('')
    })
})

describe('sanitiseNumericInput', () => {
    test('меняет точку на запятую', () => {
        expect(sanitiseNumericInput('0.032', 3)).toBe('0,032')
    })

    test('откатывает символы, отличные от цифр', () => {
        expect(sanitiseNumericInput('-5', 2)).toBeNull()
        expect(sanitiseNumericInput('abc', 2)).toBeNull()
        expect(sanitiseNumericInput('1,2,3', 2)).toBeNull()
    })

    test('подрезает дробную часть до точности поля', () => {
        expect(sanitiseNumericInput('0,1150', 3)).toBe('0,115')
        expect(sanitiseNumericInput('0,1150', 0)).toBe('0')
    })

    test('сохраняет незавершённый ввод', () => {
        expect(sanitiseNumericInput('0,', 3)).toBe('0,')
        expect(sanitiseNumericInput('', 3)).toBe('')
    })
})

describe('usageOptions / resolveModeGroup', () => {
    test('поле 1 содержит объединение подписей по всем группам без дублей', () => {
        expect(usageOptions(MODES_1C002)).toEqual([LEDGE_MATERIAL, STAINLESS_MATERIAL])
    })

    test('одинаковая подпись разводится по типу обработки', () => {
        expect(resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'ledge').id).toBe('7')
        expect(resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'groove').id).toBe('13')
    })

    test('нет группы — нет и режимов', () => {
        expect(resolveModeGroup(MODES_1C002, STAINLESS_MATERIAL, 'groove')).toBeNull()
        expect(resolveModeGroup(MODES_1C002, 'нет такого', 'ledge')).toBeNull()
    })

    test('невыбранный тип обработки не подставляет группу', () => {
        expect(resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, null)).toBeNull()
        expect(resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, undefined)).toBeNull()
    })

    test('пустой type каталога доступен как «Общие режимы резания»', () => {
        const groups = [{ type: '', material: STAINLESS_MATERIAL, nodes: [] }]
        expect(resolveProcessingTypeOptions(groups)).toEqual([
            { value: '', label: 'Общие режимы резания' },
        ])
        expect(resolveModeGroup(groups, STAINLESS_MATERIAL, '')).toBe(groups[0])
    })
})

describe('lookupRow', () => {
    const rows = [{ d: '1' }, { d: '3' }, { d: '4' }, { d: '5' }]

    test('точное совпадение', () => {
        expect(lookupRow(rows, '4', 'd')).toBe(rows[2])
    })

    test('округление до ближайшего целого', () => {
        expect(lookupRow(rows, '3,4', 'd')).toBe(rows[1])
        expect(lookupRow(rows, '3,5', 'd')).toBe(rows[2])
        expect(lookupRow(rows, '3,8', 'd')).toBe(rows[2])
    })

    test('Math.round(D − 0,5), затем Math.round(D + 0,5)', () => {
        // округлённое D = 18 отсутствует, зато есть округление D − 0,5
        expect(lookupRow([{ d: '17' }, { d: '20' }], '17,5', 'd').d).toBe('17')
        // округлённое D = 17 отсутствует, зато есть округление D + 0,5
        expect(lookupRow([{ d: '18' }, { d: '20' }], '17,4', 'd').d).toBe('18')
    })

    test('округление D не нашлось — берётся ближайшее меньшее', () => {
        expect(lookupRow([{ d: '10' }, { d: '20' }], '17', 'd').d).toBe('10')
    })

    test('ближайшее меньшее, затем ближайшее большее', () => {
        const wide = [{ d: '2' }, { d: '10' }]
        expect(lookupRow(wide, '5', 'd')).toBe(wide[0])
        expect(lookupRow(wide, '15', 'd')).toBe(wide[1])
    })

    test('пустой список и пустое D', () => {
        expect(lookupRow([], '4', 'd')).toBeNull()
        expect(lookupRow(rows, '', 'd')).toBeNull()
    })
})

describe('pickCogs', () => {
    test('находит Z по D сквозь дубликаты d1', () => {
        expect(pickCogs(TOOLS_1C002, '3')).toBe(4)
        expect(pickCogs(TOOLS_1C002, '4')).toBe(4)
        expect(pickCogs(TOOLS_1C002, '3,6')).toBe(4)
    })

    test('вне диапазона — ближайшая строка', () => {
        expect(pickCogs(TOOLS_1C002, '25')).toBe(4)
        expect(pickCogs([], '4')).toBeNull()
    })
})

describe('firstDiameter', () => {
    test('берёт первый d1 серии', () => {
        expect(firstDiameter(TOOLS_1C002)).toBe(3)
        expect(firstDiameter([{ d1: '3,5' }, { d1: '4' }])).toBe(3.5)
    })

    test('строки без разбираемого d1 пропускаются', () => {
        expect(firstDiameter([{ d1: '' }, { d1: '—' }, { d1: '6' }])).toBe(6)
    })

    test('в серии без инструментов диаметра нет', () => {
        expect(firstDiameter([])).toBeNull()
        expect(firstDiameter(null)).toBeNull()
        expect(firstDiameter([{ d1: '' }])).toBeNull()
    })
})

describe('applyFillModes', () => {
    const group = resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'ledge')

    test('1C002, уступ, D = 4', () => {
        const patch = applyFillModes(form({ diameter: '4', usage: LEDGE_MATERIAL, processingType: 'ledge' }), {
            group,
            tools: TOOLS_1C002,
        })

        expect(patch).toEqual({
            rotationalSpeed: '11000',
            pitchPerTurn: '0,115',
            cuttingDepth: '6,00',
            cuttingWidth: '0,80',
            cuttingSpeed: '138',
            minutePitch: '1265',
            cogs: '4',
            pitchPerCog: '0,029',
        })
    })

    test('1C002, уступ, D = 1,5 — округление fn идёт до расчёта fv', () => {
        const patch = applyFillModes(form({ diameter: '1,5' }), { group, tools: TOOLS_1C002 })
        // fn = 0,032 → fv = 0,032 * 28000 = 896, а не 900 из колонки каталога.
        // Это алгоритм спецификации, «исправлять» его не надо.
        expect(patch.pitchPerTurn).toBe('0,032')
        expect(patch.minutePitch).toBe('896')
    })

    test('без kae поле ae остаётся нетронутым', () => {
        const groove = resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'groove')
        const patch = applyFillModes(form({ diameter: '4', cuttingWidth: '0,90' }), {
            group: groove,
            tools: TOOLS_1C002,
        })

        expect(patch.cuttingWidth).toBeUndefined()
        // kap у «паза» есть, поэтому ap считается
        expect(patch.cuttingDepth).toBe('4,00')
        expect(patch.rotationalSpeed).toBe('9200')
        expect(patch.pitchPerTurn).toBe('0,080')
        expect(patch.cuttingSpeed).toBe('116')
        expect(patch.minutePitch).toBe('736')
        expect(patch.cogs).toBe('4')
        expect(patch.pitchPerCog).toBe('0,020')
    })

    test('без kap поле ap остаётся нетронутым', () => {
        const generic = { type: 'ledge', material: STAINLESS_MATERIAL, kap: '', kae: '', nodes: [{ d: '4', n: '1000', fn: '0,1' }] }
        const patch = applyFillModes(form({ diameter: '4', cuttingDepth: '2,00', cuttingWidth: '1,00' }), {
            group: generic,
            tools: TOOLS_1C002,
        })

        expect(patch.cuttingDepth).toBeUndefined()
        expect(patch.cuttingWidth).toBeUndefined()
        expect(patch.rotationalSpeed).toBe('1000')
        expect(patch.pitchPerTurn).toBe('0,100')
    })

    test('подобранное Z не перетирает уже введённое', () => {
        const patch = applyFillModes(form({ diameter: '4', cogs: '5' }), { group, tools: TOOLS_1C002 })
        expect(patch.cogs).toBeUndefined()
        expect(patch.pitchPerCog).toBe('0,023')
    })

    test('без группы или без D поля не трогаются', () => {
        expect(applyFillModes(form({ diameter: '4' }), {})).toEqual({})
        expect(applyFillModes(form({}), { group, tools: TOOLS_1C002 })).toEqual({})
        expect(applyFillModes(form({ diameter: '4' }), { group: null, tools: TOOLS_1C002 })).toEqual({})
    })
})

describe('applyFieldReaction', () => {
    const group = resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'ledge')
    const ctx = { group, tools: TOOLS_1C002 }

    test('поле 1 при заполненных полях 2 и 3 переписывает режимы целиком', () => {
        const state = form({ usage: STAINLESS_MATERIAL, processingType: 'ledge', diameter: '4' })
        const patch = applyFieldReaction('usage', state, ctx)

        expect(patch.rotationalSpeed).toBe('11000')
        expect(patch.pitchPerTurn).toBe('0,115')
        expect(patch.minutePitch).toBe('1265')
    })

    test('поле 1 без типа обработки режимы не переписывает', () => {
        const state = form({ usage: STAINLESS_MATERIAL, processingType: null, diameter: '4' })
        expect(applyFieldReaction('usage', state, ctx)).toEqual({})
    })

    test('поле 2 при заполненном поле 3 переписывает режимы целиком', () => {
        const state = form({ usage: LEDGE_MATERIAL, processingType: 'groove', diameter: '4' })
        const grooveCtx = { group: resolveModeGroup(MODES_1C002, LEDGE_MATERIAL, 'groove'), tools: TOOLS_1C002 }
        const patch = applyFieldReaction('processingType', state, grooveCtx)

        expect(patch.rotationalSpeed).toBe('9200')
        expect(patch.pitchPerTurn).toBe('0,080')
        expect(patch.cuttingWidth).toBeUndefined()
    })

    test('поле 3 без типа обработки считает n от Vc и fv от fn', () => {
        const state = form({
            processingType: null,
            diameter: '10',
            cuttingSpeed: '100',
            pitchPerTurn: '0,2',
            cogs: '4',
            pitchPerCog: '0,05',
        })
        const patch = applyFieldReaction('diameter', state, {})

        expect(patch.rotationalSpeed).toBe('3183')
        expect(patch.minutePitch).toBe('637')
        expect(patch.cuttingSpeed).toBeUndefined()
    })

    test('поле 3 с пустым Z очищает fz', () => {
        const state = form({
            processingType: null,
            diameter: '10',
            cuttingSpeed: '100',
            minutePitch: '600',
            pitchPerCog: '0,05',
        })
        const patch = applyFieldReaction('diameter', state, {})

        expect(patch.pitchPerTurn).toBe('0,189')
        expect(patch.pitchPerCog).toBe('')
    })

    test('поле 3 без Vc и с n считает Vc', () => {
        const state = form({ processingType: null, diameter: '10', rotationalSpeed: '3000' })
        const patch = applyFieldReaction('diameter', state, {})

        expect(patch.cuttingSpeed).toBe('94')
        expect(patch.rotationalSpeed).toBeUndefined()
    })

    test('поле 4 с fn считает fz', () => {
        const state = form({ cogs: '4', pitchPerTurn: '0,2' })
        expect(applyFieldReaction('cogs', state, {}).pitchPerCog).toBe('0,050')
    })

    test('поле 4 с fz считает fn и fv', () => {
        const state = form({ cogs: '5', pitchPerCog: '0,04', rotationalSpeed: '2000' })
        const patch = applyFieldReaction('cogs', state, {})

        expect(patch.pitchPerTurn).toBe('0,200')
        expect(patch.minutePitch).toBe('400')
    })

    test('поле 5 без диаметра очищает n', () => {
        expect(applyFieldReaction('cuttingSpeed', form({ cuttingSpeed: '100' }), {}).rotationalSpeed).toBe('')
    })

    test('поле 5 с диаметром считает n', () => {
        const state = form({ cuttingSpeed: '100', diameter: '10', pitchPerTurn: '0,2', cogs: '4' })
        const patch = applyFieldReaction('cuttingSpeed', state, {})

        expect(patch.rotationalSpeed).toBe('3183')
        expect(patch.minutePitch).toBe('637')
    })

    test('поле 6 без диаметра очищает Vc', () => {
        expect(applyFieldReaction('rotationalSpeed', form({ rotationalSpeed: '3000' }), {}).cuttingSpeed).toBe('')
    })

    test('поле 6 с диаметром считает Vc', () => {
        const state = form({ rotationalSpeed: '3000', diameter: '10' })
        expect(applyFieldReaction('rotationalSpeed', state, {}).cuttingSpeed).toBe('94')
    })

    test('поле 7 при пустом n восстанавливает n и Vc', () => {
        const state = form({ minutePitch: '1000', pitchPerTurn: '0,1', diameter: '10' })
        const patch = applyFieldReaction('minutePitch', state, {})

        expect(patch.rotationalSpeed).toBe('10000')
        expect(patch.cuttingSpeed).toBe('314')
    })

    test('поле 7 при пустом диаметре очищает Vc', () => {
        const state = form({ minutePitch: '1000', pitchPerTurn: '0,1', cuttingSpeed: '150' })
        const patch = applyFieldReaction('minutePitch', state, {})

        expect(patch.rotationalSpeed).toBe('10000')
        expect(patch.cuttingSpeed).toBe('')
    })

    test('поле 7 при заполненном n считает fn и fz', () => {
        const state = form({ minutePitch: '1000', rotationalSpeed: '4000', cogs: '4', pitchPerTurn: '0,5' })
        const patch = applyFieldReaction('minutePitch', state, {})

        expect(patch.pitchPerTurn).toBe('0,250')
        expect(patch.pitchPerCog).toBe('0,063')
    })

    test('поле 8 при пустом n восстанавливает n', () => {
        const state = form({ pitchPerTurn: '0,1', minutePitch: '1000', diameter: '10' })
        const patch = applyFieldReaction('pitchPerTurn', state, {})

        expect(patch.rotationalSpeed).toBe('10000')
        expect(patch.cuttingSpeed).toBe('314')
        expect(patch.minutePitch).toBeUndefined()
    })

    test('поле 8 при заполненном n считает fv и fz', () => {
        const state = form({ pitchPerTurn: '0,1', rotationalSpeed: '4000', cogs: '4' })
        const patch = applyFieldReaction('pitchPerTurn', state, {})

        expect(patch.minutePitch).toBe('400')
        expect(patch.pitchPerCog).toBe('0,025')
    })

    test('поле 9 с пустым Z очищает fn', () => {
        const state = form({ pitchPerCog: '0,04', rotationalSpeed: '2000' })
        expect(applyFieldReaction('pitchPerCog', state, {}).pitchPerTurn).toBe('')
    })

    test('поле 9 считает fn и fv', () => {
        const state = form({ pitchPerCog: '0,04', cogs: '5', rotationalSpeed: '2000' })
        const patch = applyFieldReaction('pitchPerCog', state, {})

        expect(patch.pitchPerTurn).toBe('0,200')
        expect(patch.minutePitch).toBe('400')
    })

    test('поле 9 при пустом n восстанавливает n и Vc', () => {
        const state = form({ pitchPerCog: '0,04', cogs: '5', minutePitch: '400', diameter: '10' })
        const patch = applyFieldReaction('pitchPerCog', state, {})

        expect(patch.pitchPerTurn).toBe('0,200')
        expect(patch.rotationalSpeed).toBe('2000')
        expect(patch.cuttingSpeed).toBe('63')
    })

    test('поля 10 и 11 никаких реакций не имеют', () => {
        const state = form({ cuttingDepth: '2,00', cuttingWidth: '1,00' })
        expect(applyFieldReaction('cuttingDepth', state, ctx)).toEqual({})
        expect(applyFieldReaction('cuttingWidth', state, ctx)).toEqual({})
    })

    test('поле 12 пересчитывает время обработки', () => {
        const state = form({ processingLength: '120', minutePitch: '1000' })
        expect(applyFieldReaction('processingLength', state, {}).processingTime).toBe('0,12')
    })

    test('пустые операнды времени обработки считаются нулём', () => {
        expect(applyFieldReaction('processingLength', form({ processingLength: '' }), {}).processingTime).toBe('0,00')

        const withoutPitch = applyFieldReaction('processingLength', form({ processingLength: '120' }), {})
        expect(withoutPitch.processingTime).toBe('0,00')
    })

    test('изменение fv пересчитывает время обработки', () => {
        const state = form({ processingLength: '120', rotationalSpeed: '4000' })
        const patch = applyFieldReaction('pitchPerTurn', form(Object.assign(state, { pitchPerTurn: '0,1' })), {})

        expect(patch.minutePitch).toBe('400')
        expect(patch.processingTime).toBe('0,30')
    })
})
