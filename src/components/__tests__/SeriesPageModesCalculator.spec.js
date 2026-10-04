import { mount } from '@vue/test-utils'
import SeriesPageModesCalculator from '@/components/catalog/SeriesPageModesCalculator.vue'

const MODES = [
    {
        node: {
            id: '7',
            type: 'ledge',
            material: 'Углеродистые стали. Vc = 150 м/мин\t\t\t\t\r',
            kap: '1,5',
            kae: '0,2',
            nodes: [{ d: '4', n: '11 000', fv: '1 260', fn: '0,115', ap: '6', ae: '0,80' }],
        },
    },
    {
        node: {
            id: '13',
            type: 'groove',
            material: 'Углеродистые стали. Vc = 125 м/мин\n',
            kap: '1',
            kae: '',
            nodes: [{ d: '4', n: '8 000', fv: '870', fn: '0,108', ap: '4', ae: '' }],
        },
    },
]

const TOOLS = [
    { node: { id: 'a', d1: '3', z: '4' } },
    { node: { id: 'b', d1: '4', z: '4' } },
]

const build = (modes = MODES, tools = TOOLS) =>
    mount(SeriesPageModesCalculator, {
        propsData: {
            series: { id: '1c002', title: 'Концевая фреза 1C002' },
            tools,
            modes,
        },
    })

describe('SeriesPageModesCalculator', () => {
    test('рендерит все 13 параметров в порядке спецификации', () => {
        const wrapper = build()
        expect(wrapper.findAll('.form-group')).toHaveLength(13)

        const labels = wrapper.findAll('.form-group label').wrappers.map((label) => label.text())
        expect(labels).toEqual([
            'Применение',
            'Тип обработки',
            'Диаметр инструмента (D)',
            'Количество зубьев (Z)',
            'Скорость резания (Vc)',
            'Частота вращения (n)',
            'Минутная подача (fv)',
            'Подача на оборот (fn)',
            'Подача на зуб (fz)',
            'Глубина резания (ap)',
            'Ширина резания (ae)',
            'Длина обработки (l)',
            'Время обработки (t)',
        ])
    })

    test('поле 13 только для чтения', () => {
        const wrapper = build()
        expect(wrapper.find('#js-calc-processingTime').attributes('disabled')).toBe('disabled')
        expect(wrapper.find('#js-calc-processingLength').attributes('disabled')).toBeUndefined()
    })

    test('рядом с полем 4 есть кнопка «Подобрать по каталогу»', async () => {
        // без инструментов в серии поле 3 пусто — подбирать Z не из чего
        const wrapper = build(MODES, [])
        const button = wrapper.find('button.btn')

        expect(button.text()).toBe('Подобрать по каталогу')
        expect(button.attributes('disabled')).toBe('disabled')

        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')
        await wrapper.vm.$nextTick()

        expect(wrapper.find('button.btn').attributes('disabled')).toBeUndefined()
    })

    test('поле 3 изначально заполнено первым диаметром серии', () => {
        const wrapper = build()

        expect(wrapper.vm.form.diameter).toBe('3,00')
        expect(wrapper.find('#js-calc-diameter').element.value).toBe('3,00')
    })

    test('первый диаметр серии сразу заполняет режимы', () => {
        const wrapper = build(
            [
                {
                    node: {
                        id: '7',
                        type: 'ledge',
                        material: 'Стали',
                        kap: '1,5',
                        kae: '0,2',
                        nodes: [{ d: '3', n: '15 000', fn: '0,075' }],
                    },
                },
            ],
            [{ node: { id: 'a', d1: '3', z: '4' } }]
        )

        expect(wrapper.vm.form).toMatchObject({
            diameter: '3,00',
            rotationalSpeed: '15000',
            pitchPerTurn: '0,075',
            cuttingSpeed: '141',
            minutePitch: '1125',
            cuttingDepth: '4,50',
            cuttingWidth: '0,60',
            cogs: '4',
            pitchPerCog: '0,019',
        })
    })

    test('в серии без инструментов поле 3 остаётся пустым', () => {
        const wrapper = build(MODES, [])

        expect(wrapper.vm.form.diameter).toBe('')
        expect(wrapper.vm.form.rotationalSpeed).toBe('')
    })

    test('поле 3 нельзя очистить у значения, заданного по умолчанию', () => {
        const wrapper = build()
        const diameter = wrapper.find('#js-calc-diameter')

        diameter.element.value = ''
        diameter.trigger('input')
        diameter.trigger('change')

        expect(wrapper.vm.form.diameter).toBe('3,00')
    })

    test('подпись применения приходит из таблицы режимов без хвоста «Vc = …»', () => {
        const wrapper = build()
        const options = wrapper.findAll('#js-calc-usage option').wrappers.map((option) => option.text())

        expect(options).toEqual(['Углеродистые стали'])
        expect(wrapper.vm.form.usage).toBe('Углеродистые стали')
    })

    test('поле 2 содержит «не выбрано» и все типы обработки серии', () => {
        const wrapper = build()
        const options = wrapper.findAll('#js-calc-processing-type option').wrappers.map((o) => o.text())

        expect(options).toEqual(['— Не выбрано —', 'В уступ', 'В паз'])
        expect(wrapper.vm.form.processingType).toBe('ledge')
    })

    test('у серии с пустым type в списке остаётся один вариант', () => {
        const wrapper = build([
            { node: { id: '1', type: '', material: 'Нержавеющие стали. Vc = 60 м/мин\t\t\r', kap: '', kae: '', nodes: [] } },
        ])
        const select = wrapper.find('#js-calc-processing-type')
        const options = select.findAll('option').wrappers.map((o) => o.text())

        expect(options).toEqual(['— Не выбрано —', 'Общие режимы резания'])
        expect(wrapper.vm.form.processingType).toBe('')
        expect(select.element.value).toBe('')
    })

    test('ввод диаметра заполняет режимы из каталога', () => {
        const wrapper = build()
        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')

        expect(wrapper.vm.form).toMatchObject({
            rotationalSpeed: '11000',
            pitchPerTurn: '0,115',
            cuttingSpeed: '138',
            minutePitch: '1265',
            cuttingDepth: '6,00',
            cuttingWidth: '0,80',
            cogs: '4',
            pitchPerCog: '0,029',
        })
    })

    test('кнопка подбора Z берёт значение из таблицы инструментов', async () => {
        const wrapper = build()
        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')
        await wrapper.vm.$nextTick()

        wrapper.vm.form.cogs = ''
        wrapper.find('button.btn').trigger('click')

        expect(wrapper.vm.form.cogs).toBe('4')
        expect(wrapper.vm.form.pitchPerCog).toBe('0,029')
    })

    test('нецифровой ввод откатывается к предыдущему значению', async () => {
        const wrapper = build()
        const length = wrapper.find('#js-calc-processingLength')
        length.element.value = 'abc'
        length.trigger('input')

        expect(length.element.value).toBe('')
        expect(wrapper.vm.form.processingLength).toBe('')

        // Откат должен пережить перерисовку формы
        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')
        await wrapper.vm.$nextTick()

        expect(length.element.value).toBe('')
    })

    test('поле 3 нельзя оставить пустым или нулевым', () => {
        const wrapper = build()
        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')

        diameter.element.value = ''
        diameter.trigger('input')
        diameter.trigger('change')
        expect(wrapper.vm.form.diameter).toBe('4')

        diameter.element.value = '0'
        diameter.trigger('input')
        diameter.trigger('change')
        expect(wrapper.vm.form.diameter).toBe('4')
    })

    test('поля 10 и 12 можно обнулить и очистить', () => {
        const wrapper = build()
        const depth = wrapper.find('#js-calc-cuttingDepth')
        const length = wrapper.find('#js-calc-processingLength')

        depth.element.value = '0'
        depth.trigger('input')
        depth.trigger('change')
        expect(wrapper.vm.form.cuttingDepth).toBe('0')

        length.element.value = ''
        length.trigger('input')
        length.trigger('change')
        expect(wrapper.vm.form.processingLength).toBe('')
    })

    test('точка ввода превращается в запятую', () => {
        const wrapper = build()
        const length = wrapper.find('#js-calc-processingLength')

        length.element.value = '120.5'
        length.trigger('input')

        expect(wrapper.vm.form.processingLength).toBe('120,5')
    })

    test('дробная часть подрезается до точности поля', () => {
        const wrapper = build()
        const pitch = wrapper.find('#js-calc-pitchPerTurn')

        pitch.element.value = '0.1150'
        pitch.trigger('input')

        expect(wrapper.vm.form.pitchPerTurn).toBe('0,115')
    })

    test('время обработки считается от длины и минутной подачи', () => {
        const wrapper = build()

        const diameter = wrapper.find('#js-calc-diameter')
        diameter.element.value = '4'
        diameter.trigger('input')

        const length = wrapper.find('#js-calc-processingLength')
        length.element.value = '12650'
        length.trigger('input')

        expect(wrapper.vm.form.processingTime).toBe('10,00')
    })
})
