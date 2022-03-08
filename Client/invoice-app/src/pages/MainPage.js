import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'

const MainPage = () => {
  const { invoices, setIsEditingInvoice } = useContext(AppContext)
  const [globalTotal, setGlobalTotal] = useState(0)
  const [fiscalYearTotal, setFiscalYearTotal] = useState(0)

  useEffect(() => {
    //global total setup
    setGlobalTotal(
      invoices.reduce((acc, cur) => {
        acc += cur.subtotal
        return acc
      }, 0)
    )

    //fiscal year setup. filter the desired date range and them add it
    let fiscalYearRange = invoices.filter((item) => {
      if (new Date().getMonth() + 1 <= 6) {
        return (
          item.date >= `${new Date().getFullYear() - 1}-07-01` &&
          item.date <= `${new Date().getFullYear()}-06-30`
        )
      } else {
        return (
          item.date >= `${new Date().getFullYear()}-07-01` &&
          item.date <= `${new Date().getFullYear() + 1}-06-30`
        )
      }
    })

    setFiscalYearTotal(
      fiscalYearRange.reduce((acc, cur) => {
        acc += cur.subtotal
        return acc
      }, 0)
    )
  }, [invoices])

  return (
    <main className="container my-5">
      {/* ************TOTALS TABLE******** */}
      <div className="table-responsive my-4 w-50">
        <table className="table table-invoice">
          <thead className="thead-light">
            <tr>
              <th className="text-center">GLOBAL TOTAL</th>
              <th className="text-center">FISCAL YEAR TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <strong>${globalTotal}</strong>
              </td>
              <td className="text-center">
                <strong>${fiscalYearTotal}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ************INVOICES TABLE******** */}
      <div className="table-responsive my-4">
        <table className="table table-invoice">
          <thead className="thead-light">
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
                          className="btn btn-primary mr-1 mb-1"
                        >
                          View
                        </Link>
                        <Link
                          to={`/invoice/${invoiceId}`}
                          className="btn btn-secondary mr-1 mb-1"
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

      <Link
        to="/invoice/new"
        type="button"
        className="btn btn-primary"
        onClick={() => setIsEditingInvoice(false)}
      >
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
