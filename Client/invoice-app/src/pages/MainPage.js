import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'

const MainPage = () => {
  const { invoices, getInvoices, setIsEditingInvoice } = useContext(AppContext)
  const [globalTotal, setGlobalTotal] = useState(
    invoices.reduce((acc, cur) => {
      acc += cur.subtotal
      return acc
    }, 0)
  )

  // useEffect(() => {
  //   getInvoices()
  // }, [invoices])

  return (
    <main className="container">
      <h1>Main Page</h1>
      <div className="card text-center d-flex" style={{ width: '120px' }}>
        <div className="card-header">TOTAL</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">${globalTotal}</li>
        </ul>
      </div>
      <div className="table-responsive my-4">
        <table className="table table-invoice table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">INVOICE</th>
              <th className="text-center">TO</th>
              <th className="text-center">FROM</th>
              <th className="text-center">TOTAL</th>
              <th className="text-center">DATE</th>
              <th className="text-center">VIEW/EDIT</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              //this built in method assigns a key to every child
              React.Children.toArray(
                invoices.map((item) => {
                  const {
                    billTo,
                    invoiceFrom,
                    invoiceNumber,
                    subtotal,
                    date,
                    invoiceId,
                  } = item
                  return (
                    <tr>
                      <td className="text-center">#{invoiceNumber}</td>
                      <td className="text-center">{billTo}</td>
                      <td className="text-center">{invoiceFrom}</td>
                      <td className="text-center">{subtotal}</td>
                      <td className="text-center">{date}</td>
                      <td className="text-center">
                        <Link
                          to={`/invoices/${invoiceId}`}
                          className="btn btn-primary mr-1"
                        >
                          View
                        </Link>
                        <Link
                          to={`/invoice/${invoiceId}`}
                          className="btn btn-secondary"
                          onClick={() => setIsEditingInvoice(true)}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
          </tbody>
        </table>
      </div>

      <Link to="/new-invoice" type="button" className="btn btn-primary">
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
