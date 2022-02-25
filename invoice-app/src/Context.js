import React, { useReducer } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoiceTotal: 2,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  )
}

export { AppProvider, AppContext }
