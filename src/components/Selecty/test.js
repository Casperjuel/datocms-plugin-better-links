import { shallowMount, config } from '@vue/test-utils'
import graphqlMock from '~/mocks/graphql'
import Selecty from './'

describe('Selecty', () => {
  test('Rendering successfully', () => {
    const wrapper = shallowMount(Selecty)

    const html = wrapper.html()

    expect(html).toMatch('Selecty')
  })
})
