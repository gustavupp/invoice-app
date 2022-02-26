import React, { useReducer } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoiceTotal: 2,
  lineTotal: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  const lineItemCount = (lineTotal) => {
    dispatch({ type: 'SET_LINE_TOTAL', payload: lineTotal })
  }

  return (
    <AppContext.Provider value={{ ...state, lineItemCount }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
