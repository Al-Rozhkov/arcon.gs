const { Document } = require('flexsearch')
const cjson = require('compressed-json')
const fs = require('fs')
const path = require('path')

function FlexSearchIndex(api, options) {
  // Setup defaults
  const {
    searchIndexes = {},
    globalOptions = {},
    compress = false
  } = options

  // Create FlexSearch instances.
  const searchIndex = Object.keys(searchIndexes).reduce((acc, indexName) => {
    const options = searchIndexes[indexName].options
      ? {
        ...globalOptions,
        ...searchIndexes[indexName].options
      }
      : globalOptions
    acc[indexName] = new Document(options)
    return acc
  }, {})

  // Set client options
  const clientOptions = {
    pathPrefix: api._app.config._pathPrefix,
    siteUrl: api._app.config.siteUrl,
    ...options
  }
  api.setClientOptions(clientOptions)

  /**
   * After the Store has been filled, and the Schema has been created, start the index import.
   */
  api.onBootstrap(async () => {
    const getCollection = api._store.getCollection
    let nodesCounter = 0

    for (const indexName of Object.keys(options.searchIndexes)) {
      // We should provide integer id for performance reasons.
      let idCounter = 0
      for (const collectionName of options.searchIndexes[indexName].collections) {
        const collection = getCollection(collectionName)

        for (const node of collection.data()) {
          searchIndex[indexName].add({
            id: idCounter,
            title: node.title,
            content: node.content,
            keywords: node.keywords,
            description: node.description,
            path: node.path,
            typeName: node.internal.typeName
          })
          idCounter++
        }
      }
      nodesCounter += idCounter
    }

    console.info(`Added ${nodesCounter} nodes to Search Index`)
  })

  /**
   * Setup an endpoint for the dev server
   */
  api.configureServer(app => {
    console.info('Serving search index...')

    for (const indexName of Object.keys(options.searchIndexes)) {
      searchIndex[indexName].export((key, data) => {
        if (data) app.get('/flexsearch/'+ indexName + '/' + key + '.json', (req, res) => {
          res.send(data)
        })
      })
    }
  })

  /**
   * Save search index to disk on build
   */
  api.afterBuild(async ({ config }) => {
    const outputDir = config.outputDir || config.outDir
    fs.mkdirSync(path.join(outputDir, 'flexsearch'))

    for (const indexName of Object.keys(options.searchIndexes)) {
      const flexsearchDir = path.join(outputDir, 'flexsearch', indexName)
      fs.mkdirSync(flexsearchDir)
      searchIndex[indexName].export(
        (key, data) => fs.writeFile(
          path.join(flexsearchDir, key + '.json'),
          data !== undefined ? data : '',
          err => !!err && console.log(err)
        )
      )
    }
  })
}

module.exports = FlexSearchIndex

module.exports.defaultOptions = () => ({
  compress: false,
  autoFetch: true,
  autoSetup: true,
  globalOptions: { preset: 'default' },
  collections: [],
  searchIndexes: {}
})
