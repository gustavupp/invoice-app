import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'

const MainPage = () => {
  const { invoices, getInvoices } = useContext(AppContext)

  useEffect(() => {
    getInvoices()
  }, [])

  return (
    <main className="container">
      <h1>Main Page</h1>
      <div className="card text-center d-flex" style={{ width: '120px' }}>
        <div className="card-header">TOTAL</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">$ 1222</li>
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
              <th className="text-center">VIEW</th>
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
                    items,
                    image,
                    invoiceNumber,
                    total,
                    date,
                  } = item
                  return (
                    <tr>
                      <td className="text-center">#{invoiceNumber}</td>
                      <td className="text-center">{billTo}</td>
                      <td className="text-center">{invoiceFrom}</td>
                      <td className="text-center">{total}</td>
                      <td className="text-center">{date}</td>
                      <td className="text-center">
                        <button className="btn btn-primary">View</button>
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
