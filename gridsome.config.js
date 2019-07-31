// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
				path.resolve(__dirname, './src/assets/scss/_styleResources.scss')
      ]
    })
}

module.exports = {
  siteName: 'ЦВМ Аркон',
  siteDescription: 'ЦВМ Аркон. Технологии высокоточной механообработки',
  siteUrl: 'cvm-arcon.ru',

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/categories/*.json',
        typeName: 'ProductCategory',
        route: '/catalog/:type/category/:id'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series-sets/*.json',
        typeName: 'ProductSeriesSet'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/end-mills/**/*.json',
        typeName: 'ProductEndMill',
        route: '/catalog/end-mills/:id',
        refs: {
          productCategory: 'ProductCategory',
          productSeriesSet: 'ProductSeriesSet'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/drills/**/*.json',
        typeName: 'ProductDrill',
        route: '/catalog/drills/:id',
        refs: {
          productSeriesSet: 'ProductSeriesSet'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/thread-mills/**/*.json',
        typeName: 'ProductThreadMill',
        route: '/catalog/thread-mills/:id',
        refs: {
          productSeriesSet: 'ProductSeriesSet'
        }
      }
    },
    {
      use: '~/source-xls',
      options: {}
    }
  ],

  chainWebpack: config => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
