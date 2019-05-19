// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

module.exports = function (api) {
  api.loadSource(store => {
    
    const { imageType } = require('gridsome/lib/graphql/types/image')
    const { GraphQLList } = require('graphql')

    const productTypes = ['ProductEndMill', 'ProductDrill', 'ProductThreadMill']
    for (let i = 0, len = productTypes.length; i < len; i++) {
      
      /* store.getContentType(productTypes[i]).addSchemaField('imgTeaser', () => ({
        type: imageType.type,
        args: imageType.args,
        async resolve (node, args, context, info) {
          let fileName = node.series
          if ('photos' in node) {
            fileName = node.photos.length > 0
              ? node.photos[0]
              : node.series
          }
          const value = path.join(__dirname, 'static', 'img', 'series', `${fileName}.jpg`)
    
          try {
            result = await context.assets.add(value, args)
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
      })) */

      store.getContentType(productTypes[i]).addSchemaField('productImg', () => ({
        type: new GraphQLList(imageType.type),
        args: imageType.args,
        async resolve (node, args, context, info) {
          const getPath = (fileName) => path.join(__dirname, 'static', 'img', 'series', `${fileName}.jpg`)
          
          const fileNames = ('photos' in node && node.photos.length > 0)
            ? node.photos.map(p => getPath(p))
            : [ getPath(node.series) ]
    
          return fileNames.reduce(
            async (acc, fileName) => {
              try {
                const result = await context.assets.add(fileName, args)

                if (result.isUrl) {
                  acc.push(result.src)
                } else {
                  acc.push({
                    type: result.type,
                    mimeType: result.mimeType,
                    src: result.src,
                    size: result.size,
                    sizes: result.sizes,
                    srcset: result.srcset,
                    dataUri: result.dataUri
                  })
                }
              } catch (err) {
                // if (error.code !== 'MODULE_NOT_FOUND') throw error
              }

              return acc
            }, [])
        }
      }))

    }
  })
}
