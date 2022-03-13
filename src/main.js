// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/scss/global.scss'
import DefaultLayout from '~/layouts/Default.vue'
import AppLogo from '~/components/AppLogo.vue'
import AppMenu from '~/components/AppMenu.vue'
import AppMenuItem from '~/components/AppMenuItem.vue'
import AppNav from '~/components/AppNav.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppLanguage from '~/components/AppLanguage.vue'

import VTooltip from 'v-tooltip'

export default function (Vue, { appOptions, head, router }) {
  // Set global components
  Vue.component('Layout', DefaultLayout)
  Vue.component('AppLogo', AppLogo)
  Vue.component('AppMenu', AppMenu)
  Vue.component('AppMenuItem', AppMenuItem)
  Vue.component('AppNav', AppNav)
  Vue.component('AppFooter', AppFooter)
  Vue.component('AppLanguage', AppLanguage)

  router.options.scrollBehavior = function (to, from, savedPosition) {
    // savedPosition is only available for popstate navigations.
    if (savedPosition) return savedPosition

    if (from && from.path === to.path) return {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      let position = { selector: to.hash }

      // specify offset of the element
      // if (to.hash === '#anchor2') {
      //   position.offset = { y: 100 }
      // }
      return position
    }

    // scroll to top by default
    return { x: 0, y: 0 }
  }

  Vue.use(VTooltip)

  appOptions.render = h => {
    return h('div', { class: 'root', attrs: { id: 'app' } }, [
      h('app-nav'),
      h('router-view'),
      h('app-footer')
    ])
  }

  // Remove "generator" meta tag
  const gIndex = head.meta.findIndex(e => e.name === 'generator')
  if (gIndex !== -1) head.meta.splice(gIndex, 1)

  // Preload font
  head.link.push(
    {
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
    }
  )
  head.htmlAttrs.lang = 'ru'
}
