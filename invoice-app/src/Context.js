import React, { useReducer, useEffect } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoiceNumber: 0,
  lineItems: [],
  subtotal: 0,
  from: '',
  to: '',
  date: '',
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    dispatch({ type: 'UPDATE_SUBTOTAL' })
  }, [state.lineItems])

  const addLineItem = (target) => {
    dispatch({ type: 'ADD_LINE_ITEM', payload: target })
  }

  const addFields = (field) => {
    dispatch({ type: 'SET_DYNAMIC_FIELDS', payload: field })
  }

  const deleteLineItem = (e, id) => {
    e.preventDefault()
    dispatch({ type: 'DELETE_LINE_ITEM', payload: id })
  }

  return (
    <AppContext.Provider
      value={{ ...state, addLineItem, addFields, deleteLineItem }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
