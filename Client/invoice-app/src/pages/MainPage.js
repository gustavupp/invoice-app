import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'

const MainPage = () => {
  const { invoices, getInvoices } = useContext(AppContext)

  useEffect(() => {
    getInvoices()
  }, [])

  return (
    <main>
      <h1>Main Page</h1>
      {invoices &&
        invoices.map((item, index) => {
          const { billTo, invoiceFrom, items, image } = item
          console.log(image)
          return (
            <>
              <h4 key={index}>
                From: {invoiceFrom} | To: {billTo}
              </h4>
              <p>{items}</p>
              <img src={image} alt="logo" height="150px" />
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
