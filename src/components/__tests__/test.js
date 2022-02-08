import { mount, shallowMount } from '@vue/test-utils'
import ArconitLogo from '@/components/ArconitLogo.vue'
import AppFooter from '@/components/AppFooter.vue'

// Dumb tests to make sure testing setup is correct.
describe('ArconitLogo', () => {
  const wrapper = mount(ArconitLogo)
  test('is Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('contain svg tag with "arconit-logo" id', () => {
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.element.id).toBe('arconit-logo')
  })
})

describe('AppFooter', () => {
  const wrapper = shallowMount(AppFooter, {
    stubs: ['app-menu', 'app-menu-item'],
    computed: {
      $static() {
        return {
          copyright: { value: '' },
          address: { value: '' },
          menu: []
        }
      }
    }
  })
  test('is Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
