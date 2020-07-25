import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ViewImage} from './ViewImage'
import Vimage from '../../components/Vimage/Vimage'

configure({adapter: new Adapter()})

describe('<ViewImage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ViewImage
        required={true}
        match={{params: {vimageId: '5f17192d717c6e3fc8690825'}, isExact: true, path: '', url: ''}} />
    )
  })

  it('should render <ViewImage /> when receiving id-image params', () => {
    expect(wrapper).to.have(<Vimage />)
  })
})
