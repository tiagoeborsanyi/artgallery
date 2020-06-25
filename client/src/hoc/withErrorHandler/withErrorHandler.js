import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrapperComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <React.Fragment>
        <Modal
          modalClosed={clearError}
          show={error}>
          {error ? error.message : null}
        </Modal>
        <WrapperComponent {...props} />
      </React.Fragment>
    )
  }
}

export default withErrorHandler
