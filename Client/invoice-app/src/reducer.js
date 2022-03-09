export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return { ...state, invoices: action.payload }

    case 'SET_IS_EDITING_INVOICE':
      return { ...state, isEditingInvoice: action.payload }

    case 'ADD_USER':
      return { ...state, userData: action.payload }

    case 'ADD_USER_INFO':
      return { ...state, userData: action.payload }

    default:
      return state
  }
}
