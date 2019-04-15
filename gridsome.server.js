// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(store => {
    const path = require('path')
    const { imageType } = require('gridsome/lib/graphql/types/image')
    const productSeries = store.getContentType('ProductSeries')

    productSeries.addSchemaField('imgTeaser', () => ({
      type: imageType.type,
      args: imageType.args,
      async resolve (node, args, context, info) {
        let fileName = node.fields.series
        if (node.fields.hasOwnProperty('photos')) {
          fileName = node.fields.photos.length > 0
            ? node.fields.photos[0]
            : node.fields.series
        }
        const value = path.join(__dirname, 'static', 'series', `${fileName}.jpg`)
  
        try {
          result = await context.queue.add(value, args)
        } catch (err) {
          return null
        }
    
        if (result.isUrl) {
          return result.src
        }
    
        return {
          type: result.type,
          mimeType: result.mimeType,
          src: result.src,
          size: result.size,
          sizes: result.sizes,
          srcset: result.srcset,
          dataUri: result.dataUri
        }
      }
    }))
  })
}