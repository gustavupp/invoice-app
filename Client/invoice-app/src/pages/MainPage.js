import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'

const MainPage = () => {
  const { invoices, getInvoices } = useContext(AppContext)
  console.log(invoices)

  useEffect(() => {
    getInvoices()
  }, [])

  return (
    <main>
      <h1>Main Page</h1>
      {invoices &&
        invoices.map((item, index) => {
          const { billTo, invoiceFrom, items } = item
          return (
            <>
              <h4 key={index}>
                From: {invoiceFrom} | To: {billTo}
              </h4>
              <p>{items}</p>
            </>
          )
        })}
      <Link to="/new-invoice" type="button" className="btn btn-primary">
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
