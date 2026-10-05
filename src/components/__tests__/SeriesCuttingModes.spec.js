import { mount } from '@vue/test-utils'
import SeriesCuttingModes from '@/components/catalog/SeriesCuttingModes.vue'

const build = (items) => mount(SeriesCuttingModes, { propsData: { items } })

const headers = (wrapper) =>
    wrapper
        .findAll('.mode-material__header .mode-value-header:not(.mode-diameter)')
        .wrappers.map((cell) => cell.text().replace(/\s+/g, ''))

describe('SeriesCuttingModes', () => {
    test('у серии без ap и ae остаются колонки n, fv, fn', () => {
        const wrapper = build([
            {
                material: 'Углеродистые и легированные стали. Vc = 85 м/мин',
                nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }],
            },
        ])

        expect(headers(wrapper)).toEqual(['nоб/мин', 'fvмм/мин', 'fnмм/об'])
        expect(wrapper.find('.mode-material__table').classes()).toContain('mode-material__table--3')
    })

    test('режимы в уступ показывают ap и ae', () => {
        const wrapper = build([
            {
                material: 'Стали',
                nodes: [{ d: '4', n: '11 000', fv: '1 260', fn: '0,115', ap: '6', ae: '0,80' }],
            },
        ])

        expect(headers(wrapper)).toEqual([
            'nоб/мин',
            'fvмм/мин',
            'fnмм/об',
            'apмм',
            'aeмм',
        ])
        expect(wrapper.find('.mode-material__table').classes()).toContain('mode-material__table--5')
    })

    test('режимы в паз показывают ap без ae', () => {
        const wrapper = build([
            {
                material: 'Стали',
                nodes: [{ d: '4', n: '8 000', fv: '870', fn: '0,108', ap: '4' }],
            },
        ])

        expect(headers(wrapper)).toEqual(['nоб/мин', 'fvмм/мин', 'fnмм/об', 'apмм'])
        expect(wrapper.find('.mode-material__table').classes()).toContain('mode-material__table--4')
    })

    test('колонка появляется, если ap есть хотя бы в одной строке', () => {
        const wrapper = build([
            { material: 'Стали', nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }] },
            { material: 'Нержавеющие стали', nodes: [{ d: '4', n: '4 800', fv: '430', fn: '0,09', ap: '2' }] },
        ])

        expect(headers(wrapper)).toContain('apмм')
    })

    test('строки таблицы заполнены по колонкам', () => {
        const wrapper = build([
            { material: 'Стали', nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }] },
        ])

        const cells = wrapper.findAll('.mode-material__node > div').wrappers.map((cell) => cell.text())
        expect(cells).toEqual(['3', '9 000', '1 080', '0,12'])
    })

    test('подсветка строки по диаметру', async () => {
        const wrapper = build([
            { material: 'Стали', nodes: [{ d: '3', n: '9 000', fv: '1 080', fn: '0,12' }] },
        ])

        wrapper.find('.mode-material__node .mode-value--n').trigger('mouseover')
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.mode-material__node .mode-diameter').classes()).toContain('highlighted')
    })
})
