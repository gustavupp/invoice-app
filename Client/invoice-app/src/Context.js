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

  /********************************INVOICES*****************************************/

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

  //posts invoice to server
  const postInvoiceToServer = async (
    invoiceFrom,
    billTo,
    invoiceNumber,
    date,
    subtotal,
    image,
    lineItems,
    paymentDetails,
    notes,
    userId
  ) => {
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('paymentDetails', paymentDetails)
      formData.append('notes', notes)
      formData.append('userId', userId)

      const options = {
        method: 'POST',
        body: formData,
      }

      try {
        const response = await fetch(
          'http://localhost:3001/api/add-invoice',
          options
        )
        const data = await response.json()
        getInvoices(userId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //updates invoice on db
  const updateInvoice = async (
    userId,
    invoiceId,
    invoiceFrom,
    billTo,
    invoiceNumber,
    date,
    subtotal,
    image,
    lineItems,
    paymentDetails,
    notes
  ) => {
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('invoiceId', invoiceId)
      formData.append('paymentDetails', paymentDetails)
      formData.append('notes', notes)

      const options = {
        method: 'PUT',
        body: formData,
      }

      try {
        const response = await fetch(
          'http://localhost:3001/api/update-invoice',
          options
        )
        const data = await response.json()
        console.log(data)
        getInvoices(userId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //delete invoice from db
  const deleteInvoice = async (invoiceId, userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/delete/${invoiceId}`,
        {
          method: 'delete',
        }
      )
      const data = await response.json()
      console.log(data)
      getInvoices(userId)
    } catch (error) {
      throw error
    }
  }
  /********************************USERS******************************************/

  const addUserToContext = (userData) => {
    dispatch({ type: 'ADD_USER', payload: userData })
  }

  //check if user exists in the database
  const checkIfUserExists = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  //add user to db
  const addUserToDb = async (email, userId) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, userId }),
    }
    try {
      const response = await fetch(
        'http://localhost:3001/api/add-user',
        options
      )
      const data = await response.json()
      console.log(data)
    } catch (error) {
      throw error
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
        checkIfUserExists,
        addUserToDb,
        postInvoiceToServer,
        updateInvoice,
        deleteInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
