import React, { useReducer, useEffect } from 'react'
import { reducer } from './reducer'
import { useAuth0 } from '@auth0/auth0-react'
const AppContext = React.createContext()

const intialState = {
  invoices: [],
  isEditingInvoice: false,
  userId: '',
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)
  //auth0 stuff
  //const { isAuthenticated, user: { sub: userId = '' } = {} } = useAuth0()

  // useEffect(() => {
  //   getInvoices()
  // }, [])

  const addUserToContext = (id) => {
    dispatch({ type: 'ADD_USER_ID', payload: id })
  }

  const setIsEditingInvoice = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_EDITING_INVOICE', payload: trueOrFalse })
  }

  //get all invoices from db
  const getInvoices = async (userId) => {
    console.log({ 'getInvoices was called, userId is:': userId })
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-invoices/${userId}`
        )
        const data = await response.json()
        dispatch({ type: 'SET_INVOICES', payload: data })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setIsEditingInvoice,
        getInvoices,
        addUserToContext,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
