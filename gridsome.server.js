// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const moment = require('moment')

const envLocale = process.env.LOCALE
const dateFormat = {
  'ru-ru': 'D MMMM YYYY',
  'en-en': 'MMMM D YYYY'
}

/**
 * Adds each item in array as node to newly created collection.
 * If property "children" exist then adds each item as child node.
 *
 * @param {*} addCollection Api function to create collection.
 * @param {String} typeName Collection name.
 * @param {*} nodes Array of nodes.
 * @param {String} origin
 */
const addHierarchicalContent = function (addCollection, typeName, filePath) {
  const collection = addCollection({ typeName })
  const origin = path.join(__dirname, filePath)
  const nodes = yaml.load(fs.readFileSync(origin, 'utf8'))

  // Adds root items to collection
  function addNodeItem(item, parent = null) {
    const node = collection.addNode({
      ...item,
      internal: { origin },
      parent
    })
    if (item.children) {
      let weight = 0
      for (const child of item.children) {
        addNodeItem({ ...child, weight }, node.path)
        weight++
      }
    }
  }

  let itemWeight = 0
  for (const item of nodes) {
    addNodeItem({
      ...item,
      weight: itemWeight,
    })
    itemWeight++
  }
}

module.exports = function (api) {
  // Set locale custom client context.
  api._app.pages.hooks.pageContext.tap('siteLocale', (context) => {
    context.locale = envLocale
    return context
  })

  api.loadSource(async ({ addCollection }) => {
    // Load localized main menu & catalog sub menu.
    addHierarchicalContent(addCollection, 'Menu', `./content/menu/main.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'MenuFooter', `./content/menu/footer.${envLocale}.yml`)
    // Add localized advantages from yml content.
    addHierarchicalContent(addCollection, 'Advantage', `./content/advantages/${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'T', `./content/locale/${envLocale}.yml`)
    // Product parameters
    addHierarchicalContent(addCollection, 'ParamCoating', `./products/params/coating.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ParamToolLength', `./products/params/tool-length.yml`)
    addHierarchicalContent(addCollection, 'ParamCuttingLength', `./products/params/cutting-length.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ParamCoolantSupply', `./products/params/coolant-supply.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ParamEndShape', `./products/params/end-shape.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ParamMatGroup', `./products/params/mat-group.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ParamCuttingShape', `./products/params/cutting-shape.${envLocale}.yml`)
    addHierarchicalContent(addCollection, 'ProductSpecial', `./products/special/${envLocale}.yml`)
  })

  // Load catalog series photos.
  const collectionsNetlify = {
    ProductEndMill: 'photos',
    ProductDrill: 'photos',
    ProductThreadMill: 'photos',
    News: 'image',
    Tech: 'image'
  }

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
        localeDate: moment(options.date)
          .locale(envLocale)
          .format(dateFormat[envLocale])
      }
    }

    // If node type is series than process localized data.
    if ([
      'ProductEndMill',
      'ProductDrill',
      'ProductThreadMill'
    ].includes(options.internal.typeName) && options.i18n) {
      for (const [key, value] of Object.entries(options.i18n[envLocale])) {
        options[key] = value
      }
      delete options.i18n
    }

    return options
  })
}
