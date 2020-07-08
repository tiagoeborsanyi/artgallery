import React from 'react'

import './Input.css'

const Input = props => {
  let classValid = ''
  if (props.invalid && props.shouldValidate && props.touched) {
    classValid = 'invalid'
  }

  return (
    <div className={`input-form-control ${props.classes}`}>
      <label>{props.label}</label>
      <input
        className={classValid}
        value={props.value}
        name={props.name}
        onChange={props.changed}
        {...props.elementConfig} />
    </div>
  )
}

export default Input
