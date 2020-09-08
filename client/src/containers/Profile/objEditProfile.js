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
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'OLD PASSWORD'
    },
    label: 'CHANGE PASSWORD',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: ''
  },
  password2: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'NEW PASSWORD'
    },
    label: '',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: ''
  },
  password3: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'CONFIRM PASSWORD'
    },
    label: '',
    value: '',
    validation: {
      minLength: 6
    },
    valid: false,
    touched: false,
    space: 'space'
  },
}
