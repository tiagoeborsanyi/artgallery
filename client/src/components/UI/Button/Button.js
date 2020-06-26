import React from 'react'

import './Button'

const Button = props => (
  <Button
    disabled={props.disabled}
    className={`button ${props.btn}`}
    onClick={props.clicked}>{props.children}</Button>
)

export default Button
