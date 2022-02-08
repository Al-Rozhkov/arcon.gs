// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')
const moment = require('moment')

const envLocale = process.env.LOCALE
const dateFormat = {
  'ru-ru': 'D MMMM YYYY',
  'en-en': 'MMMM D YYYY'
}

/**
 * Gets first line and strips tags.
 * @param {String} text 
 * @returns 
 */
function getSafeDescription(text) {
  return text.split('\n', 1)[0].replace(/<\/?[^>]+(>|$)/g, "")
}

/**
 * Exports.
 */
module.exports = function (api) {
  // Set locale custom client context.
  api._app.pages.hooks.pageContext.tap('siteLocale', (context) => {
    context.locale = envLocale
    return context
  })

  // Load catalog series photos.
  const collectionsNetlify = {
    ProductEndMill: 'photos',
    ProductDrill: 'photos',
    ProductThreadMill: 'photos',
    News: 'image',
    Tech: 'image'
  }

  const titleMap = envLocale === 'ru-ru'
    ? {
      ProductEndMill: 'Концевая фреза',
      ProductDrill: 'Сверло',
      ProductThreadMill: 'Резьбовая фреза',
    }
    : {
      ProductEndMill: 'End mill',
      ProductDrill: 'Drill',
      ProductThreadMill: 'Thread mill',
    }

  const seriesCollectionMap = {
    'ProductEndMill': 'ProductItemEndMill',
    'ProductDrill': 'ProductItemDrill',
    'ProductThreadMill': 'ProductItemThreadMill'
  }

  /**
   * Implements hook on each node creation.
   */
  api.onCreateNode(options => {
    // We should fix image paths broken by netlifyCMS
    // If image path match 'fileName.jpg' without leading './'
    // then change it to path relative to content markdown file.
    const fieldName = collectionsNetlify[options.internal.typeName]
    if (fieldName && options[fieldName] && typeof options[fieldName] === 'string') {
      const imagePath = options[fieldName]
      // If image path match 'fileName.jpg' without leading './'
      if (/^\w/.test(imagePath) && !/^[a-z][a-z0-9+.-]*:/i.test(imagePath)) {
        const out = path.join(path.dirname(options.internal.origin), imagePath)
        console.warn(`Broken image on ${options.internal.typeName}/{${fieldName}}:: `, out)
        options[fieldName] = out
      }
    }

    // Insert localized date value manually.
    // @todo Remove it when fucking gridsome fix context query variables.
    if (options.internal.typeName === 'News') {
      options = {
        ...options,
        description: getSafeDescription(options.content),
        localeDate: moment(options.date)
          .locale(envLocale)
          .format(dateFormat[envLocale])
      }
    }

    // If node type is series than:
    if (Object.keys(seriesCollectionMap).includes(options.internal.typeName)) {
      // 1) process localized data if exists,
      if (options.i18n) {
        for (const [key, value] of Object.entries(options.i18n[envLocale])) {
          options[key] = value
        }
        delete options.i18n
      }

      // 2) compose title value.
      const productItems = api._store.getCollection(seriesCollectionMap[options.internal.typeName]).findNodes({ series: options.id })

      options.title = titleMap[options.internal.typeName] + ' ' + options.id.toUpperCase()
      options.description = options.content
      options.keywords = productItems.map(i => i.series + i.name).join(', ')
    }

    return options
  })
}
