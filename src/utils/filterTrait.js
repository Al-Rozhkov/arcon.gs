// import { materials } from '~/utils/fieldsMapping.js'

const filters = {
  type: {
    name: 'Тип инструмента',
    list: [
      {
        text: "Фрезы концевые",
        value: "end-mills"
      },
      {
        text: "Сверла центровочные",
        value: "drills-center"
      },
      {
        text: "Фрезы фасон. фасочные (зенковки)",
        value: "shaped-mills"
      },
      {
        text: "Многофункциональный инструмент",
        value: "multifunctional"
      },
      {
        text: "Резьбовые фрезы",
        value: "thread-mills"
      }
    ]
  },
  endShapes: {
    name: 'Форма торца',
    list: [
      {
        text: 'любая',
        value: false
      },
      {
        text: 'прямоугольная',
        value: ['rect-sharp', 'rect-r', 'rect-f']
      },
      {
        text: 'радиусная',
        value: 'radius'
      },
      {
        text: 'сферическая',
        value: 'sphere'
      }
    ]
  },
  /* mainUsage: {
    name: 'Применение',
    list: Object.keys(materials).map(key => {
      return {
        text: `${key} — ${materials[key]}`,
        value: key
      }
    })
  }, */
  coating: {
    name: 'Покрытие',
    list: [
      {
        text: 'любое',
        value: false
      },
      {
        text: 'nACo-G',
        value: 'ng'
      },
      {
        text: 'TiAlN',
        value: 'tan'
      },
      /* {
        text: 'TiN',
        value: 'tin'
      }, */
      {
        text: 'PurePolish (полировка)',
        value: 'pp'
      }
    ]
  },
  cuttingPartLength: {
    name: 'Длина режущей части',
    list: [
      {
        text: 'любая',
        value: false
      },
      {
        text: 'короткая',
        value: 'short'
      },
      {
        text: 'средняя',
        value: 'middle'
      },
      {
        text: 'длинная',
        value: 'long'
      }
    ]
  }
}

export default filters
