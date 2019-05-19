const XLSX = require('xlsx')
const glob = require('globby')

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
    const ProductItemMill = addContentType({
      typeName: 'ProductItemMill'
    })
    ProductItemMill.addReference('series', 'ProductEndMill')

    const files = await glob('products/product-items/mills/*.xls')
    await Promise.all(files.map(async file => {
      createNodes(ProductItemMill, file)
    }))

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
