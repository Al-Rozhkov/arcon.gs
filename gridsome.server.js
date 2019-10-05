// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')
const { imageType } = require('gridsome/lib/graphql/types/image')

const getPath = (fileName) => path.join(__dirname, 'static', 'img', 'series', `${fileName}.jpg`)

const getImages = async (fileNames) => {
  
}

module.exports = function (api) {
  api.loadSource(store => {
    const productTypes = ['ProductEndMill', 'ProductDrill', 'ProductThreadMill']
    for (let i = 0, len = productTypes.length; i < len; i++) {
      
      store.addSchemaResolvers({
        [productTypes[i]]: {
          productImg: {
            // type: GraphQLList(imageType.type),
            type: '[Image]',
            args: imageType.args,
            async resolve(obj, args, context) {
              const fileNames = ('photos' in obj && obj.photos.length > 0)
                ? obj.photos.map(p => getPath(p))
                : [ getPath(obj.id) ]
              // console.log(fileNames)

              const acc = []
              for (let fnIndex = 0; fnIndex < fileNames.length; fnIndex++) {
                try {
                  const result = await context.assets.add(fileNames[fnIndex], args)

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
                  console.log(err)
                  // if (error.code !== 'MODULE_NOT_FOUND') throw error
                }
              }
              return acc
            }
          }
        }
      })
      
      // addSchemaField is deprecated
      /* store.getContentType(productTypes[i]).addSchemaField('productImg', () => ({
        type: GraphQLList(imageType.type),
        args: imageType.args,
        resolve (node, args, context) {
          const getPath = (fileName) => path.join(__dirname, 'static', 'img', 'series', `${fileName}.jpg`)
          
          const fileNames = ('photos' in node && node.photos.length > 0)
            ? node.photos.map(p => getPath(p))
            : [ getPath(node.id) ]
    
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
      })) */

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

    }
  })
}
