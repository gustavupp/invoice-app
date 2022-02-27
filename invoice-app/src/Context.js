import React, { useReducer, useEffect, useState } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoiceNumber: 0,
  lineItems: [],
  subtotal: 0,
  from: '',
  to: '',
  date: '',
  editingLineItem: '',
  editingLineItemId: '',
  isEditingLineItem: false,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)
  const [lineItemTotal, setLineItemTotal] = useState(0)
  const [service, setService] = useState('')
  const [quantity, setQuantity] = useState('')
  const [rate, setRate] = useState('')

  useEffect(() => {
    dispatch({ type: 'UPDATE_SUBTOTAL' })
  }, [state.lineItems])

  useEffect(() => {
    setLineItemTotal(rate * quantity)
  }, [rate, quantity])

  const addLineItem = () => {
    if (quantity && rate) {
      let newItem = {
        id: Date.now(),
        service,
        quantity,
        rate,
        lineItemTotal,
      }

      dispatch({ type: 'ADD_LINE_ITEM', payload: newItem })
      //reset fields
      setQuantity('')
      setRate('')
      setLineItemTotal(0)
      setService('')
    }
  }

  const addFields = (field) => {
    dispatch({ type: 'SET_DYNAMIC_FIELDS', payload: field })
  }

  const deleteLineItem = (e, id) => {
    e.preventDefault()
    dispatch({ type: 'DELETE_LINE_ITEM', payload: id })
  }

  const editLineItem = (e, id) => {
    e.preventDefault()
    dispatch({ type: 'EDIT_LINE_ITEM', payload: id })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addLineItem,
        addFields,
        deleteLineItem,
        editLineItem,
        setService,
        setQuantity,
        setRate,
        addLineItem,
        service,
        quantity,
        rate,
        lineItemTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
