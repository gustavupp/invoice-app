export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        lineItems: action.payload,
        isEditingLineItem: false,
        editingLineItemId: '',
      }

    case 'SET_INVOICES':
      return { ...state, invoices: action.payload }

    default:
      return { ...state }
  }
}
