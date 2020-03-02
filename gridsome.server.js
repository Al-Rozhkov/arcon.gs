// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

module.exports = function(api) {
  // api.loadSource(store => {

  // })

  // typeName: fieldName
  const collectionsNetlify = {
    ProductEndMill: 'photos',
    ProductDrill: 'photos',
    ProductThreadMill: 'photos',
    News: 'image',
    Tech: 'image'
  }

  // We should fix image paths broken by netlifyCMS
  // If image path match 'fileName.jpg' without leading './'
  // then change it to path relative to content markdown file.
  api.onCreateNode(options => {
    const fieldName = collectionsNetlify[options.internal.typeName]
    if (fieldName && options[fieldName] && typeof options[fieldName] === 'string') {
      const imagePath = options[fieldName]
      // If image path match 'fileName.jpg' without leading './'
      if (/^\w/.test(imagePath) && !/^[a-z][a-z0-9+.-]*:/i.test(imagePath)) {
        const out = path.join(path.dirname(options.internal.origin), imagePath)
        console.warn(`Broken image on ${options.internal.typeName}/{${fieldName}}:: `, out)
        options[fieldName] = out
      }
      return options
    }
  })
}
