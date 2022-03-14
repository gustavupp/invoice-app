export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return { ...state, invoices: action.payload }

    case 'SET_IS_EDITING_INVOICE':
      return { ...state, isEditingInvoice: action.payload }

    case 'ADD_USER_INFO':
      return { ...state, userInfo: action.payload }

    case 'SET_IS_INVOICE_LOADING':
      return { ...state, isInvoiceLoading: action.payload }

    case 'SET_IS_USER_SETTINGS_LOADING':
      return { ...state, isUserSettingsLoading: action.payload }

    default:
      return state
  }
}
