import React, { useReducer, useEffect, useState } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const intialState = {
  invoices: [],
  invoiceNumber: '',
  lineItems: [],
  subtotal: 0,
  from: '',
  to: '',
  date: '',
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
    if (state.isEditingLineItem) {
      let updatedItemList = state.lineItems.map((item) => {
        if (item.id === state.editingLineItemId) {
          item.service = service
          item.rate = rate
          item.quantity = quantity
          item.lineItemTotal = lineItemTotal
        }
        return item
      })
      dispatch({ type: 'UPDATE_LIST', payload: updatedItemList })
    } else if (quantity && rate) {
      let newItem = {
        id: Date.now(),
        service,
        quantity,
        rate,
        lineItemTotal,
      }
      dispatch({ type: 'ADD_LINE_ITEM', payload: newItem })
    }
    //reset fields
    setQuantity('')
    setRate('')
    setLineItemTotal(0)
    setService('')
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
    let editingLineItem = state.lineItems.find((item) => item.id === id)

    setRate(editingLineItem.rate)
    setQuantity(editingLineItem.quantity)
    setService(editingLineItem.service)
    setLineItemTotal(editingLineItem.lineItemTotal)

    dispatch({ type: 'EDIT_LINE_ITEM', payload: editingLineItem.id })
  }

  //sends invoice to server
  const postInvoiceToServer = async () => {
    if (
      state.from &&
      state.to &&
      state.invoiceNumber &&
      state.date &&
      state.subtotal
    ) {
      console.log('hi')
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          from: state.from,
          to: state.to,
          invoiceNumber: state.invoiceNumber,
          date: state.date,
          subtotal: state.subtotal,
          lineItems: JSON.stringify(state.lineItems),
        }),
      }

      try {
        await fetch('http://localhost:3001/api/add-invoice', options).then(
          (res) => console.log(res)
        )
        // .then(() => {
        //   dispatch({ type: 'CLEAR_FIELDS' })
        //   setQuantity('')
        //   setRate('')
        //   setLineItemTotal(0)
        //   setService('')
        // })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/get-invoices')
      const data = await response.json()
      console.log(data)
      dispatch({ type: 'SET_INVOICES', payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
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
        postInvoiceToServer,
        getInvoices,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
