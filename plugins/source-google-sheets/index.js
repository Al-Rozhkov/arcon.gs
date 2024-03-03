const { google } = require('googleapis')
const { mapValues } = require('lodash')

class GoogleSheetSource {
  static defaultOptions() {
    return {
      /**
       * Идентификатор документа
       */
      spreadsheetId: '',
      /**
       * 
       */
      apiKey: '',
      route: null,
      /**
       * Имя коллекции в базе данных
       */
      typeName: 'googleSheet',
      /**
       * Массив полей, которые будут объединены в массив строк внутри поля nodes
       */
      mergeToNodes: null,
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

      if (this.options.mergeToNodes) {
        this.addMergedData(sheets.data.valueRanges, this.options.mergeToNodes)
      } else {
        this.addFlatData(sheets.data.valueRanges);
      }
    })
  }

  /**
   * Функция сохраняет node на каждую строку документа.
   * Создает дополнительное поле range, значение которого увеличивается каждый раз при появлении пустой строки.
   * Это позволяет разбивать на произвольные группы однотипные элементы.
   * 
   * @param {*} sheets
   */
  addFlatData(sheets) {
    let range = 0

    for (const sheet of sheets) {
      const titles = sheet.values.shift()

      for (const row of sheet.values) {
        // If row is empty then increase inner "range" value
        if (row.length) {
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
  }

  addMergedData(sheets, fieldsToMerge) {
    let id = 0
    for (const sheet of sheets) {
      const titles = sheet.values.shift()

      let collectionNode = null

      const processRow = (row) => {
        const node = {}
        const subnode = {}
        for (const field of titles) {
          if (row[field]) {
            if (fieldsToMerge.includes(field)) {
              subnode[field] = row[field];
            } else {
              node[field] = row[field]
            }
          }
        }

        return { node, subnode }
      }

      for (const rowArray of sheet.values) {
        if (rowArray.length) {
          const rowObj = titles.reduce(
            (acc, key, index) => ({ ...acc, [key]: rowArray[index] }),
            {}
          )

          const { node, subnode } = processRow(rowObj);

          if (Object.keys(node).length) {
            id++;
            collectionNode = { ...node, id, nodes: [subnode] }
          } else if (collectionNode && Object.keys(subnode).length) {
            collectionNode.nodes.push(subnode)
          }
        } else if (!rowArray.length && collectionNode) {
          // Try to add node, if data provided
          this.collection.addNode(collectionNode)

          collectionNode = null;
        }
      }

      // Save last node separately
      if (collectionNode) {
        this.collection.addNode(collectionNode)
      }
    }
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
