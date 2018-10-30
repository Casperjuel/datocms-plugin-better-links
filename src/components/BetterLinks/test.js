import { shallowMount, config } from '@vue/test-utils'
import graphqlMock from '~/mocks/graphql'
import pluginMock from '~/mocks/plugin'
import BetterLinks from './'

config.mocks.$graphql = graphqlMock()

describe('BetterLinks', () => {
  test('Rendering successfully', () => {
    const wrapper = shallowMount(BetterLinks, {
      propsData: { plugin: pluginMock() },
    })

    const html = wrapper.html()

    expect(html).toMatch('BetterLinks')
    expect(html).toMatch(/Selecty/i)
  })
})
