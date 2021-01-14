// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')
const GOOGLE_API_KEY = 'AIzaSyAl18vUoRtNKHSJ-f8aPfqeRXBfpVfvjlw'

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
  siteUrl: 'https://arconit.ru',

  plugins: [
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '13M6Antl-Sm50BVeSVSVqDiI3QPMY_GPK9qrrjO3WfLk',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemEndMill'
      }
    },
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '1JlzrzNqV_qnh28GJkbC5s4l4kHaqP39GdGMhkh3nE4A',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemDrill'
      }
    },
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '1YeOBK9pVCCHtXGoNmhZH8P2ZJL9qGxK6IwmdBfpB9bc',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemThreadMill'
      }
    },
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
        path: 'products/types/*.json',
        typeName: 'ProductType'
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
        path: 'products/special/*.md',
        typeName: 'ProductSpecial'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/news/**/*.md',
        typeName: 'News'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/services/*.md',
        typeName: 'Service'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/tech/*.md',
        typeName: 'Tech'
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    },
    {
      use: 'gridsome-plugin-yandex-metrika',
      options: {
        id: 48415064,
        options: {
          clickmap: true,
          webvisor: true
        }
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    }
  ],

  templates: {
    ProductCategory: '/catalog/:type/category/:id',
    ProductEndMill: '/catalog/end-mills/:id',
    ProductDrill: '/catalog/drills/:id',
    ProductThreadMill: '/catalog/thread-mills/:id',
    News: '/news/:year/:title',
    Service: '/services/:title',
    Tech: '/tech#:title'
  },

  chainWebpack: config => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },

  transformers: {
    remark: {
      externalLinksTarget: false
    }
  }
}
