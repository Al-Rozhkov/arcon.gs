import { shallowMount } from '@vue/test-utils'
import SeriesModesPage from '@/components/catalog/SeriesModesPage.vue'

const SERIES = { id: '2cs02', title: 'Сверло 2CS02', content: 'Сверло', keywords: '2CS02', hasCuttingModes: true }

const DRILL_MODES = [{ node: { type: '', material: 'Углеродистые стали', nodes: [] } }]

const build = (modes = DRILL_MODES, title = '') =>
    shallowMount(SeriesModesPage, {
        propsData: { series: SERIES, modes, title },
        slots: { default: '<div class="page-content" />' },
    })

describe('SeriesModesPage', () => {
    test('общая рамка: шапка серии, вкладки и содержимое страницы', () => {
        const wrapper = build()

        expect(wrapper.findAll('series-page-header-stub')).toHaveLength(1)
        expect(wrapper.findAll('series-page-tabs-stub')).toHaveLength(1)
        expect(wrapper.findAll('.page-content')).toHaveLength(1)
    })

    test('у серии без режимов вместо содержимого — предложение связаться', () => {
        const wrapper = build([])

        expect(wrapper.findAll('.page-content')).toHaveLength(0)
        expect(wrapper.text()).toContain('свяжитесь с нашими представителями')
    })

    test('заголовок страницы режимов — название серии', () => {
        const wrapper = build()

        expect(wrapper.vm.$options.metaInfo.call(wrapper.vm).title).toBe('Сверло 2CS02')
    })

    test('заголовок калькуляторной страницы', () => {
        const wrapper = build(DRILL_MODES, 'Калькулятор режимов резания Сверло 2CS02')

        expect(wrapper.vm.$options.metaInfo.call(wrapper.vm).title).toBe(
            'Калькулятор режимов резания Сверло 2CS02'
        )
    })
})
