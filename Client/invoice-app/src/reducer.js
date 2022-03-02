export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LINE_ITEM':
      return {
        ...state,
        lineItems: [...state.lineItems, action.payload],
      }

    case 'UPDATE_SUBTOTAL':
      let total = state.lineItems?.reduce((acc, cur) => {
        acc += cur.lineItemTotal
        return acc
      }, 0)
      return { ...state, subtotal: total }

    case 'SET_DYNAMIC_FIELDS':
      return { ...state, [action.payload.name]: action.payload.value }

    case 'DELETE_LINE_ITEM':
      let tempLineItems = state.lineItems.filter(
        (item) => item.id !== action.payload
      )
      return { ...state, lineItems: tempLineItems }

    case 'EDIT_LINE_ITEM':
      return {
        ...state,
        editingLineItemId: action.payload,
        isEditingLineItem: true,
      }

    case 'UPDATE_LIST':
      return {
        ...state,
        lineItems: action.payload,
        isEditingLineItem: false,
        editingLineItemId: '',
      }

    case 'SET_INVOICES':
      return { ...state, invoices: action.payload }

    case 'CLEAR_FIELDS':
      return {
        ...state,
        invoiceNumber: '',
        from: '',
        billTo: '',
        date: '',
        lineItems: [],
      }

    case 'LOAD_IMAGE_FILE':
      return { ...state, image: action.payload }
    default:
      return { ...state }
  }
}
