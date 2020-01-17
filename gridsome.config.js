// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_styleResources.scss')
      ]
    })
}

module.exports = {
  siteName: 'ARCONIT',
  siteDescription: 'ARCONIT – Режущий инструмент',
  siteUrl: 'arconit.ru',

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/categories/*.json',
        typeName: 'ProductCategory'
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
        refs: {
          productSeriesSet: 'ProductSeriesSet'
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'news/**/*.md',
        typeName: 'News'
      }
    },
    {
      use: 'gridsome-plugin-yandex-metrika',
      options: {
        id: 48415064
      }
    },
    {
      use: '~/source-xls',
      options: {}
    }
  ],

  templates: {
    ProductCategory: '/catalog/:type/category/:id',
    ProductEndMill: '/catalog/end-mills/:id',
    ProductDrill: '/catalog/drills/:id',
    ProductThreadMill: '/catalog/thread-mills/:id',
    News: '/news/:id'
  },

  chainWebpack: config => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
