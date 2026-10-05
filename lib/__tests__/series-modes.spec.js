const { resolveModesSeries } = require('../series-modes')

// Листы режимов резания покрывают не только серию с таким же именем:
// «2ss» — это все 2ss003…2ss278, «6rp» — это 6rp02…6rp13.
const MODES_SERIES = ['1c001', '1r042', '2cs02', '2ss', '6rp', '7v01']

describe('resolveModesSeries', () => {
    test('точное совпадение имени серии', () => {
        expect(resolveModesSeries('2cs02', MODES_SERIES)).toBe('2cs02')
        expect(resolveModesSeries('7v01', MODES_SERIES)).toBe('7v01')
    })

    test('лист, покрывающий семейство серий', () => {
        expect(resolveModesSeries('2ss003', MODES_SERIES)).toBe('2ss')
        expect(resolveModesSeries('2ss278-ss', MODES_SERIES)).toBe('2ss')
        expect(resolveModesSeries('6rp13', MODES_SERIES)).toBe('6rp')
    })

    test('из двух префиксов берётся самый длинный', () => {
        expect(resolveModesSeries('1c006', ['1c', '1c006'])).toBe('1c006')
        expect(resolveModesSeries('1c109', ['1c', '1c10', '1c109'])).toBe('1c109')
        expect(resolveModesSeries('1c108', ['1c', '1c10', '1c109'])).toBe('1c10')
    })

    test('префикс оборван не границей имени — совпадения нет', () => {
        // «2cs» не лист режимов, а часть названия, а не начало серии.
        expect(resolveModesSeries('2csxx', MODES_SERIES)).toBe(null)
        expect(resolveModesSeries('6rpx', MODES_SERIES)).toBe(null)
    })

    test('серия без режимов', () => {
        expect(resolveModesSeries('2cs04', MODES_SERIES)).toBe(null)
        expect(resolveModesSeries('7mf02', MODES_SERIES)).toBe(null)
    })

    test('пустой каталог режимов', () => {
        expect(resolveModesSeries('2cs02', [])).toBe(null)
        expect(resolveModesSeries('2cs02')).toBe(null)
    })
})
