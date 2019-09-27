import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import Home from './Home'

describe('Home', () => {
  const mockStore = configureMockStore()
  const MOCK_STORE_STATE = {}

  let wrapper
  let store

  beforeEach(() => {
    store = mockStore(MOCK_STORE_STATE)
    wrapper = shallow(<Home store={store} />)
  })

  test('renders without crashing', () => {
    wrapper
  })
})
