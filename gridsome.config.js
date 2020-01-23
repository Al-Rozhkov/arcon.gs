// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')
const GOOGLE_API_KEY = 'AIzaSyAl18vUoRtNKHSJ-f8aPfqeRXBfpVfvjlw'

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
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '13GOZ5YNID_fRCsPTy-okHjYutvEGP4beBPH2nwu8ztM',
        apiKey: GOOGLE_API_KEY,
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
