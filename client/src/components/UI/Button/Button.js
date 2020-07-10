import React from 'react'

import './Button.css'

const Button = props => (
  <button
    type={props.type}
    disabled={props.disabled}
    className={`button ${props.btnType}`}
    onClick={props.clicked}>{props.children}</button>
)

export default Button
