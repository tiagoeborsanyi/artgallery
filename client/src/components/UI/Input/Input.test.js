import React from 'react'
import { cleanup, fireEventm, render } from '@testing-library/react'
import Input from './Input'

afterEach(cleanup)

it('Input receive data', () => {
  const {

  } = render(
    <Input
      inputType='input'
      label='titulo'
      elementConfig={{subtitle: 'subtitle'}}
      value=''
      onChange={() => {}}
      type='text' />
  )
})
