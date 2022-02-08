const { google } = require('googleapis')
const { mapValues } = require('lodash')

class GoogleSheetSource {
  static defaultOptions() {
    return {
      spreadsheetId: '',
      apiKey: '',
      route: null,
      typeName: 'googleSheet',
    }
  }

  constructor(api, options = GoogleSheetSource.defaultOptions()) {
    this.options = options

    api.loadSource(async actions => {
      this.createCollections(actions)

      const googleSheets = google.sheets({
        version: 'v4',
        auth: this.options.apiKey,
      })

      const spreadsheets = await googleSheets.spreadsheets.get({
        spreadsheetId: this.options.spreadsheetId
      })
      const ranges = spreadsheets.data.sheets.map(s => s.properties.title)

      const sheets = await googleSheets.spreadsheets.values.batchGet({
        spreadsheetId: this.options.spreadsheetId,
        ranges,
      })

      let range = 0
      for (const sheet of sheets.data.valueRanges) {
        const titles = sheet.values.shift()
        for (const row of sheet.values) {
          // If row is empty then increase inner "range" value
          if (row.length > 0) {
            const node = titles.reduce(
              (acc, key, index) => ({ ...acc, [key]: row[index] }),
              { range }
            )
            this.collection.addNode(node)
          } else {
            range++
          }
        }
      }
    })
  }

  normalizeRefs(refs) {
    return mapValues(refs, (ref) => {
      if (typeof ref === 'string') {
        ref = { typeName: ref, create: false }
      }

      if (!ref.typeName) {
        ref.typeName = this.options.typeName
      }

      ref.create = ref.create ? true : false

      return ref
    })
  }

  createCollections(actions) {
    const addCollection = actions.addCollection || actions.addContentType

    this.refs = this.normalizeRefs(this.options.refs)

    this.collection = addCollection({
      typeName: this.options.typeName,
      route: this.options.route
    })

    mapValues(this.refs, (ref, key) => {
      this.collection.addReference(key, ref.typeName)

      if (ref.create) {
        addCollection({
          typeName: ref.typeName,
          route: ref.route
        })
      }
    })
  }
}

module.exports = GoogleSheetSource
