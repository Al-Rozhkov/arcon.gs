const XLSX = require('xlsx')

const createNodes = (contentType, filePath) => {
  const xls = XLSX.readFile(filePath)
  xls.SheetNames.forEach((n) => {
    const parsedContent = XLSX.utils.sheet_to_json(xls.Sheets[n], {raw: false})

    for (let i = 0; i < parsedContent.length; i++) {
      // Check if row contain required columns
      if ('series' in parsedContent[i] && 'name' in parsedContent[i]) {
        contentType.addNode(parsedContent[i])
      }
    }
  })
}

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    
    // Thread Mills
    
    // Product items. Mills
    const ProductItemEndMill = addCollection({
      typeName: 'ProductItemEndMill'
    })
    createNodes(ProductItemEndMill, 'products/product-items/mills.xls')

    // Product items. Drills
    const ProductItemDrill = addCollection({
      typeName: 'ProductItemDrill'
    })
    createNodes(ProductItemDrill, 'products/product-items/drills.xls')

    // Product items. Thread mills
    const ProductItemThreadMills = addCollection({
      typeName: 'ProductItemThreadMill'
    })
    createNodes(ProductItemThreadMills, 'products/product-items/thread-mills.xls')

  })
}
