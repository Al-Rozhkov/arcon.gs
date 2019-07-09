// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/scss/global.scss'
import DefaultLayout from '~/layouts/Default.vue'
import AppLogo from '~/components/AppLogo.vue'
import AppNav from '~/components/AppNav.vue'
import AppFooter from '~/components/AppFooter.vue'
// import AppLoading from '~/components/AppLoading.vue'

import VTooltip from 'v-tooltip'

export default function (Vue, { router, appOptions, isClient, head }) {
  // Set global components
  Vue.component('Layout', DefaultLayout)
  Vue.component('AppLogo', AppLogo)
  Vue.component('AppNav', AppNav)
  Vue.component('AppFooter', AppFooter)
  // Vue.component('AppLoading', AppLoading)

  Vue.use(VTooltip)

  appOptions.render = h => {
    return h('div', { class: 'root', attrs: { id: 'app' } }, [
      // h('app-loading', { ref: 'loading' }),
      h('app-nav'),
      h('router-view'),
      h('app-footer'),
    ])
  }

  // Remove "generator" meta tag
  const gIndex = head.meta.findIndex(e => e.name === 'generator')
  if (gIndex !== -1)
    head.meta.splice(gIndex, 1)
  
  // Preload font
  head.link.push({
    rel: 'preload',
    href: '/fonts/arcon-regular.woff2',
    as: 'font',
    crossorigin: 'anonymous'
  },
  {
    rel: 'preload',
    href: '/fonts/arcon-bold.woff2',
    as: 'font',
    crossorigin: 'anonymous'
  })
  head.htmlAttrs.lang = 'ru'
  
  /* router.beforeEach((to, from, next) => {
    AppLoading.methods.start()
    next()
  })
  router.afterEach(() => {
    AppLoading.methods.finish()
  }) */
}
