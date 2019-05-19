const XLSX = require('xlsx')

const createNodes = (contentType, filePath) => {
  const xls = XLSX.readFile(filePath)
  xls.SheetNames.forEach((n) => {
    const parsedContent = XLSX.utils.sheet_to_json(xls.Sheets[n], {raw: false})

    for (let i = 0; i < parsedContent.length; i++) {
      if ('series' in parsedContent[i] && 'name' in parsedContent[i]) {
        contentType.addNode(parsedContent[i])
      }
    }
  })
}

module.exports = function (api, options) {

  api.loadSource(async ({ addContentType }) => {
    
    // Mills
    const ProductItemEndMill = addContentType({
      typeName: 'ProductItemEndMill'
    })
    ProductItemEndMill.addReference('series', 'ProductEndMill')
    createNodes(ProductItemEndMill, 'products/product-items/mills/mills--lower.xls')
    createNodes(ProductItemEndMill, 'products/product-items/mills/mills.xls')

    // Drills
    const ProductItemDrill = addContentType({
      typeName: 'ProductItemDrill'
    })
    ProductItemDrill.addReference('series', 'ProductDrill')
    createNodes(ProductItemDrill, 'products/product-items/drills.xls')

    // Thread mills
    const ProductItemThreadMills = addContentType({
      typeName: 'ProductItemThreadMill'
    })
    ProductItemThreadMills.addReference('series', 'ProductThreadMill')
    createNodes(ProductItemThreadMills, 'products/product-items/thread-mills.xls')

  })
}
