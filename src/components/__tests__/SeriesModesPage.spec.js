import { shallowMount } from '@vue/test-utils'
import SeriesModesPage from '@/components/catalog/SeriesModesPage.vue'

const SERIES = { id: '2cs02', title: 'Сверло 2CS02', content: 'Сверло', keywords: '2CS02', hasCuttingModes: true }

const DRILL_MODES = [
    {
        node: {
            type: '',
            material: 'Углеродистые стали',
            nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }],
        },
    },
]

const build = (modes = DRILL_MODES, tables = true) =>
    shallowMount(SeriesModesPage, {
        propsData: { series: SERIES, tools: [], modes, tables },
    })

describe('SeriesModesPage', () => {
    test('общие режимы резания без типа обработки', () => {
        const wrapper = build()

        expect(wrapper.find('series-cutting-modes-stub').attributes('items')).toBeTruthy()
        expect(wrapper.text()).toContain('Режимы обработки')
        expect(wrapper.text()).not.toContain('Режимы обработки уступа')
    })

    test('режимы в уступ и в паз попадают в свои разделы', () => {
        const wrapper = build([
            { node: { type: 'ledge', material: 'Стали', nodes: [] } },
            { node: { type: 'groove', material: 'Стали', nodes: [] } },
        ])

        expect(wrapper.findAll('series-cutting-modes-stub')).toHaveLength(2)
        expect(wrapper.text()).toContain('Режимы обработки уступа')
        expect(wrapper.text()).toContain('Режимы обработки паза')
    })

    test('без таблиц остаётся только калькулятор', () => {
        const wrapper = build(DRILL_MODES, false)

        expect(wrapper.findAll('series-cutting-modes-stub')).toHaveLength(0)
        expect(wrapper.findAll('series-page-modes-calculator-stub')).toHaveLength(1)
    })

    test('у серии без режимов предложение связаться с представителями', () => {
        const wrapper = build([])

        expect(wrapper.findAll('series-page-modes-calculator-stub')).toHaveLength(0)
        expect(wrapper.text()).toContain('свяжитесь с нашими представителями')
    })

    test('заголовок калькуляторной страницы', () => {
        const title = (tables) => {
            const wrapper = build(DRILL_MODES, tables)
            return wrapper.vm.$options.metaInfo.call(wrapper.vm).title
        }

        expect(title(false)).toBe('Калькулятор режимов резания Сверло 2CS02')
        expect(title(true)).toBe('Сверло 2CS02')
    })
})