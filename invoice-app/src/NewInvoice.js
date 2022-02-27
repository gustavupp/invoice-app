import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './Context'
import { AiOutlineClose } from 'react-icons/ai'
import './styles/NewInvoice.css'

export const NewInvoice = () => {
  const { lineItems, addLineItem, subtotal, addFields, deleteLineItem } =
    useContext(AppContext)
  const [lineItemTotal, setLineItemTotal] = useState(0)
  const [service, setService] = useState('')
  const [quantity, setQuantity] = useState('')
  const [rate, setRate] = useState('')

  useEffect(() => {
    setLineItemTotal(rate * quantity)
  }, [rate, quantity])

  const addIndividualItem = () => {
    //only go ahead if quantity and rate fields are not empty
    if (quantity && rate) {
      let newItem = {
        id: Date.now(),
        service,
        quantity,
        rate,
        lineItemTotal,
      }
      //dispatch action
      addLineItem(newItem)
      //reset fields
      setQuantity('')
      setRate('')
      setLineItemTotal(0)
      setService('')
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
            id="invoiceNumber"
            name="invoiceNumber"
            onChange={(e) => addFields(e.target)}
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
            onChange={(e) => addFields(e.target)}
            placeholder="Who is this invoice from?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">Bill To</label>
          <input
            type="text"
            className="form-control"
            id="to"
            name="to"
            onChange={(e) => addFields(e.target)}
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
            onChange={(e) => addFields(e.target)}
          />
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Amount</th>
              <th></th>
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

            {lineItems &&
              lineItems.map((item, index) => {
                const { service, quantity, rate, lineItemTotal, id } = item
                return (
                  <tr key={index}>
                    <td>{service}</td>
                    <td>{quantity} </td>
                    <td>{rate}</td>
                    <td>${lineItemTotal}</td>
                    <td>
                      <button onClick={(e) => deleteLineItem(e, id)}>
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <button
          className="btn btn-success mr-3"
          type="button"
          id="btn"
          onClick={addIndividualItem}
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
