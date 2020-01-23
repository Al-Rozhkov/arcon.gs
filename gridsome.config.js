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
    /* {
      use: '~/source-google-docs',
      options: {
        foldersIds: ['0B5byfKNIu897c0FoTkVGOUhFZ3M'],
        clientId: '153895999971-ipl09sl6s1jdp92q1r0k5l934di1s0is.apps.googleusercontent.com',
        clientSecret: 'Ky-IcErC7kMpMX70iqXNCyKe',
        apiKey: 'AIzaSyBVZLmP7wd4Oit6A-dbdBBi2i6ZznwJDws',
      },
    }, */
    {
      use: '~/source-google-sheets',
      options: {
        spreadsheetId: '10QZNaQOfYEDS48aYu-9HIO_SO-Tpi1YHcHYqMh0F7v0',
        apiKey: 'AIzaSyBVZLmP7wd4Oit6A-dbdBBi2i6ZznwJDws',
        typeName: 'ProductItemEndMill'
      }
    },
    {
      use: '~/source-google-sheets',
      options: {
        spreadsheetId: '1Ro0mRPX_5oo45aB60O1fnaaE5NlnjM8GAf_MAWBubkU',
        apiKey: 'AIzaSyBVZLmP7wd4Oit6A-dbdBBi2i6ZznwJDws',
        typeName: 'ProductItemDrill'
      }
    },
    {
      use: '~/source-google-sheets',
      options: {
        spreadsheetId: '12jylV2Gd5PQPgSgIsZsI4rlfo9nOTsAmtIxuQ9e8JqQ',
        apiKey: 'AIzaSyBVZLmP7wd4Oit6A-dbdBBi2i6ZznwJDws',
        typeName: 'ProductItemThreadMill'
      }
    },
    {
      use: 'gridsome-plugin-yandex-metrika',
      options: {
        id: 48415064
      }
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
