import React from 'react'

import './Input.css'

const Input = props => (
  <div className={`input-form-control ${props.classes}`}>
    <label>{props.label}</label>
    <input
      value={props.value}
      onChange={props.changed}
      {...props.elementConfig} />
  </div>
)

export default Input
