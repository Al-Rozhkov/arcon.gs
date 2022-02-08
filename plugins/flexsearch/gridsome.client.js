import { Document } from 'flexsearch'
import cjson from 'compressed-json'
import pMap from 'p-map'

export default async function (Vue, options, { isClient, router }) {
  const {
    searchIndexes = {},
    globalOptions,
    compress = false,
    autoFetch = true,
    autoSetup = true,
    pathPrefix,
    siteUrl
  } = options

  if (isClient) {
    const basePath = pathPrefix && (process.env.NODE_ENV !== 'development' || location.origin === siteUrl)
      ? `${pathPrefix}/flexsearch/` : '/flexsearch/'

    /**
     * Loads search index.
     * @param {*} search 
     */
    const loadSearchIndex = async (search, indexName) => {
      const chunks = [
        'content.cfg',
        'content.ctx',
        'content.map',
        'keywords.cfg',
        'keywords.ctx',
        'keywords.map',
        'title.cfg',
        'title.ctx',
        'title.map',
        // 'tag',
        'reg',
        'store',
      ]

      await pMap(chunks, async (chunk) => {
        try {
          const data = await fetch(`${basePath}${indexName}/${chunk}.json`)
            .then(response => response.text())
            .then(text => {
              try {
                const json = JSON.parse(text)
                return json
              } catch (err) {
                return false
              }
            })

          if (data) {
            if (compress) searchIndex = cjson.decompress(searchIndex)
            search.import(chunk, data)
          }
        } catch (err) {
          console.warn('Failed to load chunk ' + chunk, err)
        }
      })
    }

    // Manually setup the Flexsearch instance
    if (!autoSetup) {
      Vue.prototype.$flexsearch = {
        flexsearch: {
          ...flexsearch,
          doc: {
            id: 'id',
            field: searchFields
          }
        },
        basePath,
        loadIndex: loadSearchIndex
      }
      return
    }

    // Setup global Flexsearch Instance
    const search = {}

    Vue.prototype.$search = search
    Vue.prototype.$searchOptions = { basePath }
    Vue.prototype.$searchLoad = () => {
      for (const searchIndex in searchIndexes) {
        search[searchIndex] = new Document(globalOptions)
        loadSearchIndex(search[searchIndex], searchIndex)
      }
    }

    if (!autoFetch) return
    // if (typeof autoFetch === 'string' || typeof autoFetch === 'object') {
    //   let loaded = false
    //   const pathsToLoad = typeof autoFetch === 'string' ? [autoFetch] : autoFetch
    //   return router.afterEach(({ path: currentPath }) => {
    //     if (pathsToLoad.includes(currentPath) && !loaded) {
    //       loaded = true
    //       return loadSearchIndex(search)
    //     }
    //   })
    // }
    // else return loadSearchIndex(search)
  }
}
