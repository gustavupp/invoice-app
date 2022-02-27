import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './Context'
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
//import './styles/newInvoice.css'

export const NewInvoice = () => {
  const {
    lineItems,
    addLineItem,
    subtotal,
    addFields,
    deleteLineItem,
    editLineItem,
    isEditingLineItem,
    service,
    quantity,
    rate,
    lineItemTotal,
    setService,
    setQuantity,
    setRate,
    to,
    from,
    date,
    number,
  } = useContext(AppContext)

  return (
    <main className="container mt-5">
      <form>
        <section className="d-flex justify-content-between">
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              className="form-control"
              id="from"
              name="from"
              value={from}
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
              value={to}
              onChange={(e) => addFields(e.target)}
              placeholder="Who is this invoice to?"
            />
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="invoice-number">Invoice Number</label>
              <input
                type="number"
                className="form-control"
                id="number"
                name="number"
                value={number}
                onChange={(e) => addFields(e.target)}
                placeholder="#1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={(e) => addFields(e.target)}
              />
            </div>
          </div>
        </section>

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
                      <button
                        className="btn"
                        onClick={(e) => editLineItem(e, id)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="btn"
                        onClick={(e) => deleteLineItem(e, id)}
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        {
          <button
            className="btn btn-primary mr-3"
            type="button"
            id="btn"
            onClick={addLineItem}
          >
            {isEditingLineItem ? 'Save' : '+ Item'}
          </button>
        }
      </form>

      <div className="d-flex justify-content-end m-2">
        <h5>Subtotal:&nbsp; </h5>
        <h5> ${subtotal}</h5>
      </div>

      <div className="d-flex justify-content-end m-2">
        <Link to="/invoice" className="btn btn-success">
          Generate Invoice
        </Link>
      </div>
    </main>
  )
}
