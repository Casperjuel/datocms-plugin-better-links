export default () => ({
  field: {
    attributes: {
      label: 'record',
      api_key: '',
      validators: { item_item_type: { item_types: [1] } },
    },
  },

  parameters: {
    instance: {
      fields: '',
    },
  },

  getFieldValue() {},
  setFieldValue() {},
  addFieldChangeListener() {},
})
