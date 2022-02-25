import React, { useContext, useState } from 'react'
import LineItem from './LineItem'
import { AppContext } from './Context'
import './styles/NewInvoice.css'

export const NewInvoice = () => {
  const { invoiceTotal } = useContext(AppContext)
  console.log(invoiceTotal)
  const [fields, setFields] = useState([])
  const [num, setNum] = useState(1)
  console.log(fields)
  const handleChange = (e) => {
    e.preventDefault()
    setFields({ ...fields, [e.target.name]: e.target.value })
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
          />
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Service</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: num }).map((_, index) => (
              <LineItem key={index} index={index} handleChange={handleChange} />
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-success mr-3"
          type="button"
          id="btn"
          onClick={() => setNum((num) => num + 1)}
        >
          + Line Item
        </button>

        <div className="subtotal">
          <h5>Subtotal:&nbsp; </h5>
          <h5> $182</h5>
        </div>
      </form>
    </main>
  )
}
