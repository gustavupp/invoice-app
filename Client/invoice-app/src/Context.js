import React, { useReducer, useEffect, useState } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoices: [],
  isEditingInvoice: false,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    getInvoices()
  }, [])

  const setIsEditingInvoice = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_EDITING_INVOICE', payload: trueOrFalse })
  }

  //get all invoices from db
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
        setIsEditingInvoice,
        getInvoices,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
