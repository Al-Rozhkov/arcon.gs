// import { materials } from '~/utils/fieldsMapping.js'

const filters = {
  endShapes: {
    name: 'Форма торца',
    list: [
      {
        text: 'прямоугольная',
        value: {
          value: ['rect-sharp', 'rect-r', 'rect-f']
        }
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
