// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
				path.resolve(__dirname, './src/assets/scss/_styleResources.scss'),
				// you can also use a glob if you'd prefer
				// path.resolve(__dirname, './src/assets/sass/*.sass'),
      ],
    })
}

module.exports = {
  siteName: 'ЦВМ Аркон',
  siteDescription: 'ЦВМ Аркон. Технологии высокоточной механообработки',
  siteUrl: 'cvm-arcon.ru',

  plugins: [
    /* {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/'],
        width: 1260,
        height: 900
      }
    }, */
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/categories/*.json',
        typeName: 'ProductCategory',
        route: '/catalog/:slug'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'products/series/**/*.json',
        typeName: 'ProductSeries',
        route: '/catalog/products/series/:series',
        refs: {
          productCategory: 'ProductCategory'
        }
      }
    }
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'products/ProductCategories.csv',
    //     typeName: 'CSVCategory',
    //     route: '/csv/:slug'
    //   }
    // },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'products/ProductSeries.csv',
    //     typeName: 'CSVSeries',
    //     route: '/csv/products/tools/:slug'
    //   }
    // }
  ],

  chainWebpack: config => {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
	}
}