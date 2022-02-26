import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './Context'
import './styles/NewInvoice.css'

export const NewInvoice = () => {
  const { invoiceTotal } = useContext(AppContext)
  const [lineItems, setLineItems] = useState([])
  const [lineItemTotal, setLineItemTotal] = useState(0)
  const [service, setService] = useState('')
  const [quantity, setQuantity] = useState('')
  const [rate, setRate] = useState('')
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    setLineItemTotal(rate * quantity)
  }, [rate, quantity])

  useEffect(() => {
    let total = lineItems?.reduce((acc, cur) => {
      acc += cur.lineItemTotal
      return acc
    }, 0)
    setSubtotal(total)
  }, [lineItems])

  const addLineItem = (e) => {
    e.preventDefault()

    if (quantity && rate) {
      let newItem = {
        service,
        quantity,
        rate,
        lineItemTotal,
      }
      setQuantity('')
      setRate('')
      setLineItemTotal(0)
      setService('')
      setLineItems([...lineItems, newItem])
    }
  }

  return (
    <main className="container mt-4">
      <form>
        <div className="form-group">
          <label htmlFor="invoice-number">Invoice Number</label>
          <input
            type="number"
            className="form-control"
            id="invoice-number"
            placeholder="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            name="from"
            //onChange={(e) => handleChange(e)}
            placeholder="Who is this invoice from?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="billTo">Bill To</label>
          <input
            type="text"
            className="form-control"
            id="billTo"
            name="billTo"
            //onChange={(e) => handleChange(e)}
            placeholder="Who is this invoice to?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            //onChange={(e) => handleChange(e)}
          />
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder=" Description of service..."
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder=" Quantity"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder=" $"
                />
              </td>
              <td>${lineItemTotal}</td>
            </tr>

            {lineItems.map((item) => {
              return (
                <tr>
                  <td>{item.service}</td>
                  <td>{item.quantity} </td>
                  <td>{item.rate}</td>
                  <td>${item.lineItemTotal}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <button
          className="btn btn-success mr-3"
          type="button"
          id="btn"
          onClick={addLineItem}
        >
          + Line Item
        </button>
      </form>

      <div className="subtotal">
        <h5>Subtotal:&nbsp; </h5>
        <h5> ${subtotal}</h5>
      </div>
    </main>
  )
}
