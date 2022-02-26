export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LINE_TOTAL':
      return {
        ...state,
      }
    default:
      return { ...state }
  }
}
