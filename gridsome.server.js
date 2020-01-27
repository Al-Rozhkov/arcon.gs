// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')
const { imageType } = require('gridsome/lib/graphql/types/image')

const getPath = (fileName) => path.join(__dirname, 'static', 'img', 'series', `${fileName}.jpg`)

module.exports = function (api) {
  api.loadSource(store => {
    const productTypes = ['ProductEndMill']
    for (let i = 0, len = productTypes.length; i < len; i++) {
      
      store.addSchemaResolvers({
        [productTypes[i]]: {
          productImg: {
            type: '[Image]',
            args: imageType.args,
            async resolve(obj, args, context) {
              const fileNames = ('photos' in obj && obj.photos.length > 0)
                ? obj.photos.map(p => getPath(p))
                : [ getPath(obj.id) ]

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

    }
  })
}
