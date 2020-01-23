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

      for (const sheet of sheets.data.valueRanges) {
        const titles = sheet.values.shift()
        for (const row of sheet.values) {
          if (row.length > 0) {
            const node = titles.reduce(
              (acc, key, index) => ({ ...acc, [key]: row[index] }),
              {}
            )
            this.collection.addNode(node)
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

      if (ref.create) {
        ref.create = true
      } else {
        ref.create = false
      }

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
