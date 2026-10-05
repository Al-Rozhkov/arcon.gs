import { shallowMount } from '@vue/test-utils'
import SeriesCuttingModesTables from '@/components/catalog/SeriesCuttingModesTables.vue'

const DRILL_MODES = [
    {
        node: {
            type: '',
            material: 'Углеродистые стали',
            nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }],
        },
    },
]

const build = (modes = DRILL_MODES, comment = '') =>
    shallowMount(SeriesCuttingModesTables, {
        propsData: { modes, comment },
    })

describe('SeriesCuttingModesTables', () => {
    test('общие режимы резания без типа обработки', () => {
        const wrapper = build()

        expect(wrapper.findAll('series-cutting-modes-stub')).toHaveLength(1)
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
        expect(wrapper.findAll('.cutting-modes-icon')).toHaveLength(2)
    })

    test('примечание серии выводится под таблицами', () => {
        const wrapper = build(DRILL_MODES, '<p>Снижайте обороты при вылете 5D</p>')

        expect(wrapper.find('.alert-warning').html()).toContain('Снижайте обороты при вылете 5D')
    })

    test('без примечания alert не выводится', () => {
        expect(build().find('.alert-warning').exists()).toBe(false)
    })

    test('калькулятора на странице режимов нет', () => {
        expect(build().findAll('series-page-modes-calculator-stub')).toHaveLength(0)
    })
})
