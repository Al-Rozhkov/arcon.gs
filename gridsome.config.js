// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const envLocale = process.env.LOCALE

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_styleResources.scss'),
      ],
    })
}

module.exports = {
  siteName: 'ARCONIT',
  siteDescription: 'ARCONIT – Режущий инструмент',
  siteUrl: 'https://arconit.ru',

  plugins: [
    //
    // Products
    //
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '13M6Antl-Sm50BVeSVSVqDiI3QPMY_GPK9qrrjO3WfLk',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemEndMill',
      },
    },
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '1JlzrzNqV_qnh28GJkbC5s4l4kHaqP39GdGMhkh3nE4A',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemDrill',
      },
    },
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '1YeOBK9pVCCHtXGoNmhZH8P2ZJL9qGxK6IwmdBfpB9bc',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ProductItemThreadMill',
      },
    },

    // Cutting modes
    {
      use: '~/plugins/source-google-sheets',
      options: {
        spreadsheetId: '1YKFACSE_TEnzZRQu4x7f5HYpndUMMH2E0vx1qlJb4TA',
        apiKey: GOOGLE_API_KEY,
        typeName: 'ModeEndMill',
      },
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        path: `products/categories/${envLocale}/*.json`,
        typeName: 'ProductCategory',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/types/*.json',
        typeName: 'ProductType',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series-sets/*.json',
        typeName: 'ProductSeriesSet',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/end-mills/**/*.json',
        typeName: 'ProductEndMill',
        refs: {
          endShapes: 'ParamEndShape',
          productCategory: 'ProductCategory',
          productSeriesSet: 'ProductSeriesSet',
          mainUsage: 'ParamMatGroup',
          possibleUsage: 'ParamMatGroup',
          coating: 'ParamCoating',
          cuttingShapes: 'ParamCuttingShape',
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/drills/**/*.json',
        typeName: 'ProductDrill',
        refs: {
          productSeriesSet: 'ProductSeriesSet',
          mainUsage: 'ParamMatGroup',
          possibleUsage: 'ParamMatGroup',
          coating: 'ParamCoating',
          coolantSupply: 'ParamCoolantSupply',
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/thread-mills/**/*.json',
        typeName: 'ProductThreadMill',
        refs: {
          productSeriesSet: 'ProductSeriesSet',
          mainUsage: 'ParamMatGroup',
          possibleUsage: 'ParamMatGroup',
          coating: 'ParamCoating',
          cuttingShapes: 'ParamCuttingShape',
          coolantSupply: 'ParamCoolantSupply',
        },
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/custom/${envLocale}.yml`,
        typeName: 'ProductCustom',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/extra/${envLocale}.yml`,
        typeName: 'ProductExtra',
      },
    },

    //
    // Product parameters
    //
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/coating.${envLocale}.yml`,
        typeName: 'ParamCoating',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/tool-length.yml`,
        typeName: 'ParamToolLength',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/cutting-length.${envLocale}.yml`,
        typeName: 'ParamCuttingLength',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/coolant-supply.${envLocale}.yml`,
        typeName: 'ParamCoolantSupply',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/end-shape.${envLocale}.yml`,
        typeName: 'ParamEndShape',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/mat-group.${envLocale}.yml`,
        typeName: 'ParamMatGroup',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `products/params/cutting-shape.${envLocale}.yml`,
        typeName: 'ParamCuttingShape',
      },
    },

    //
    // Navigation
    //
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `content/menu/main.${envLocale}.yml`,
        typeName: 'Menu',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `content/menu/footer.${envLocale}.yml`,
        typeName: 'MenuFooter',
      },
    },

    //
    // Content
    //
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: `content/pages/${envLocale}/*.md`,
        typeName: 'MdPage',
      },
    },

    {
      use: '@gridsome/source-filesystem',
      options: {
        path: `content/news/${envLocale}/**/*.md`,
        typeName: 'News',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: `content/services/${envLocale}/*.md`,
        typeName: 'Service',
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: `content/tech/${envLocale}/*.md`,
        typeName: 'Tech',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `content/advantages/${envLocale}.yml`,
        typeName: 'Advantage',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `content/agents/${envLocale}.yml`,
        typeName: 'Agent',
      },
    },
    {
      use: '~/plugins/yaml-array',
      options: {
        path: `content/locale/${envLocale}.yml`,
        typeName: 'T',
      },
    },

    //
    // Settings
    //
    {
      use: '@gridsome/plugin-sitemap',
    },
    {
      use: '~/plugins/flexsearch',
      options: {
        globalOptions: {
          charset: 'cyrillic',
          lang: 'ru',
          split: /\s+/,
          tokenize: 'forward',
          minlength: 3,
          document: {
            id: 'id',
            index: ['title', 'keywords', 'content'],
            store: ['title', 'path', 'description', 'typeName'],
            minlength: 3,
          },
        },
        autoFetch: '/search',
        searchIndexes: {
          series: {
            collections: [
              'ProductEndMill',
              'ProductDrill',
              'ProductThreadMill',
            ],
          },
          content: {
            collections: ['MdPage', 'Service', 'News'],
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-yandex-metrika',
      options: {
        id: 48415064,
        options: {
          clickmap: true,
          webvisor: true,
        },
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
      },
    },
  ],

  //
  // Templates configuration
  // @link https://gridsome.org/docs/templates/
  //
  templates: {
    ProductCategory: '/catalog/:type/category/:id',
    ProductEndMill: [
      {
        path: '/catalog/end-mills/:id',
        component: './src/templates/ProductEndMill.vue'
      },
      {
        name: 'cuttingModes',
        path: '/catalog/end-mills/:id/modes',
        component: './src/templates/ProductEndMill-CuttingModes.vue'
      }
    ],
    ProductDrill: '/catalog/drills/:id',
    ProductThreadMill: '/catalog/thread-mills/:id',
    News: '/news/:year/:title',
    Service: '/services/:title',
    Tech: '/tech#:title',
  },

  chainWebpack: (config) => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )
  },

  transformers: {
    remark: {
      externalLinksTarget: false,
      plugins: ['@mavrin/remark-typograf'],
    },
  },
}
