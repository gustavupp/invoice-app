import React, { useReducer, useEffect, useState } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoices: [],
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    getInvoices()
  }, [])

  const getInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/get-invoices')
      const data = await response.json()
      dispatch({ type: 'SET_INVOICES', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,

        getInvoices,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
