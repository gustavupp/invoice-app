import React, { useReducer, useEffect } from 'react'
import { reducer } from './reducer'
const AppContext = React.createContext()

const intialState = {
  invoices: [],
  isEditingInvoice: false,
  userData: [],
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  const addUserToContext = (userData) => {
    dispatch({ type: 'ADD_USER', payload: userData })
  }

  const setIsEditingInvoice = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_EDITING_INVOICE', payload: trueOrFalse })
  }

  //get all invoices from db
  const getInvoices = async (userId) => {
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

  //get user info from db
  const getUserFromDb = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`)
      const data = await response.json()
      dispatch({ type: 'ADD_USER_INFO', payload: data })
    } catch (error) {
      throw error
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setIsEditingInvoice,
        getInvoices,
        addUserToContext,
        getUserFromDb,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
