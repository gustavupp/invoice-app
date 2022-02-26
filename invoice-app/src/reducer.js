export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LINE_ITEM':
      return { ...state, lineItems: [...state.lineItems, action.payload] }
    case 'UPDATE_SUBTOTAL':
      let total = state.lineItems?.reduce((acc, cur) => {
        acc += cur.lineItemTotal
        return acc
      }, 0)
      return { ...state, subtotal: total }
    case 'SET_DYNAMIC_FIELDS':
      //if (action.payload.name === 'to') return { ...state, to: action.payload.value }
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return { ...state }
  }
}
