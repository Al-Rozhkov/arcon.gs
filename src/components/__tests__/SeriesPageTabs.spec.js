import { shallowMount } from '@vue/test-utils'
import SeriesPageTabs from '@/components/catalog/SeriesPageTabs.vue'

const build = (path, node = { id: '2cs02', hasCuttingModes: true }) =>
    shallowMount(SeriesPageTabs, {
        propsData: { node },
        mocks: { $route: { path } },
        stubs: { 'g-link': true },
    })

const links = (wrapper) => wrapper.findAll('g-link-stub').wrappers.map((link) => link.attributes('to'))

describe('SeriesPageTabs', () => {
    test('адреса вкладок на странице серии', () => {
        expect(links(build('/catalog/drills/2cs02/'))).toEqual([
            '/catalog/drills/2cs02/',
            '/catalog/drills/2cs02/modes/#page-tabs',
            '/catalog/drills/2cs02/calculator/#page-tabs',
        ])
    })

    test('раздел каталога берётся из адреса страницы', () => {
        const node = { id: '6rp02', hasCuttingModes: true }

        expect(links(build('/catalog/thread-mills/6rp02/', node))).toEqual([
            '/catalog/thread-mills/6rp02/',
            '/catalog/thread-mills/6rp02/modes/#page-tabs',
            '/catalog/thread-mills/6rp02/calculator/#page-tabs',
        ])
    })

    test('на странице режимов серия не теряется', () => {
        expect(links(build('/catalog/end-mills/1c001/modes/'))).toEqual([
            '/catalog/end-mills/1c001/',
            '/catalog/end-mills/1c001/modes/#page-tabs',
            '/catalog/end-mills/1c001/calculator/#page-tabs',
        ])
    })

    test('адрес без завершающего слэша', () => {
        expect(links(build('/catalog/drills/2ss003-ss/calculator'))).toEqual([
            '/catalog/drills/2ss003-ss/',
            '/catalog/drills/2ss003-ss/modes/#page-tabs',
            '/catalog/drills/2ss003-ss/calculator/#page-tabs',
        ])
    })

    test('у серии без режимов резания только ссылка на саму серию', () => {
        const wrapper = build('/catalog/drills/2cs04/', { id: '2cs04', hasCuttingModes: false })

        expect(links(wrapper)).toEqual(['/catalog/drills/2cs04/'])
    })
})
