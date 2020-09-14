export const objEditProfile = {
  displayName: {
    key: 'displayName',
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'YOUR DISPLAY NAME'
    },
    label: 'DISPLAY NAME',
    value: '',
    validation: {
      minLength: 3
    },
    valid: false,
    touched: false,
    space: 'space'
  },
  location: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'YOUR LOCATION'
    },
    label: 'LOCATION',
    value: '',
    validation: {
      minLength: 3
    },
    valid: false,
    touched: false,
    space: 'space'
  },
  about: {
    elementType: 'textarea',
    elementConfig: {
      type: 'text-area',
      divline: 'newart-form-control-flexline'
    },
    label: 'ABOUT ME',
    value: '',
    validation: {
      required: false,
    },
    valid: true,
    touched: true,
    space: 'space'
  },
  password1: {
    key: 'password1',
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'OLD PASSWORD'
    },
    label: 'OLD PASSWORD',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: 'space'
  },
  password2: {
    key: 'password2',
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'NEW PASSWORD'
    },
    label: 'NEW PASSWORD',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: 'space'
  },
  password3: {
    key: 'password3',
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'CONFIRM PASSWORD'
    },
    label: 'CONFIRM PASSWORD',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: 'space'
  },
}

// arquivo alterado
