import React from 'react'

import './Backdrop.css'

const backdrop = props => (
    props.show ? <div className='backdrop open' onClick={props.clicked} style={{display: 'block'}}></div> : null
)

export default backdrop
