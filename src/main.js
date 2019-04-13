// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/scss/global.scss'
import DefaultLayout from '~/layouts/Default.vue'
import AppLogo from '~/components/AppLogo.vue'

import VTooltip from 'v-tooltip'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('AppLogo', AppLogo)

  Vue.use(VTooltip)
}
