export const objForm = {
  title: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      subtitle: '(REQUIRED)',
      placeholder: 'Your Title'
    },
    label: 'Title',
    value: '',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false,
    space: 'space'
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      type: 'text-area',
      divline: 'newart-form-control-flexline'
    },
    label: 'Description',
    value: '',
    validation: {
      required: false,
    },
    valid: true,
    touched: true,
    space: 'space'
  },
  preview1: {
    elementType: 'input-image',
    elementConfig: {
      type: 'file',
      selectimg: false,
      subtitle: '280x350',
      width: '140px',
      height: '175px',
      svgWidth: "48px",
      svgHeight: "48px",
      previewurl: '',
      thumburl: '',
      metadata: {}
    },
    label: 'Thumbnail',
    value: '',
    validation: {
      required: false
    },
    valid: true,
    touched: true,
    space: 'space'
  },
  preview2: {
    elementType: 'input-image',
    elementConfig: {
      type: 'file',
      selectimg: true,
      subtitle: '280x350 (REQUIRED)',
      extratext: 'max 5 images',
      width: '220px',
      height: '270px',
      svgWidth: "100px",
      svgHeight: "100px",
      previewurl: '',
      thumburl: '',
      metadata: {}
    },
    label: 'Original Image',
    value: '',
    validation: {
      required: true
    },
    valid: true,
    touched: true,
    space: 'space'
  },
  tags: {
    elementType: 'tags',
    elementConfig: {
      type: 'text',
      placeholder: 'Press "Enter" after each tag.',
      content: ['all']
    },
    label: 'Tags',
    value: '',
    validation: {
      required: false,
    },
    valid: true,
    touched: true,
    space: 'space'
  },
  download: {
    elementType: 'checkbox-switch',
    elementConfig: {
      type: 'checkbox',
      checked: false
    },
    label: 'Allow Download',
    value: '',
    validation: {
      required: false,
    },
    valid: true,
    touched: true,
    space: 'space'
  }
}
