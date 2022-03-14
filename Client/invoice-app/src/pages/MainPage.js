import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'
import { AiFillEdit } from 'react-icons/ai'
import { BiShowAlt } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'

const MainPage = () => {
  const { invoices, setIsEditingInvoice } = useContext(AppContext)
  const [globalTotal, setGlobalTotal] = useState(0)
  const [fiscalYearTotal, setFiscalYearTotal] = useState(0)
  //const [theme, setTheme] = useState('info')
  //auth0 stuff
  const { isAuthenticated, user: { picture = '', nickname = '' } = {} } =
    useAuth0()

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
    <main style={{ minHeight: '70vh' }} className="container my-5">
      {isAuthenticated ? (
        <div className=" d-flex align-items-center justify-content-start">
          <h5>Welcome {nickname} !</h5>
          <img
            src={picture}
            alt="profile"
            width="50px"
            style={{ borderRadius: '50%', margin: '0 25px' }}
          />
        </div>
      ) : null}

      {/* ************TOTALS TABLE******** */}
      <div
        style={{ borderRadius: '10px' }}
        className="table-responsive my-4 w-75"
      >
        <table
          style={{ borderRadius: '10px' }}
          // className={`table table-invoice table-${theme}`}
          className="table table-invoice table-info"
        >
          <thead className="thead-dark">
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
      {invoices.length > 0 ? (
        <div style={{ borderRadius: '10px' }} className="table-responsive my-4">
          <table
            style={{ borderRadius: '10px' }}
            //className={`table table-invoice table-${theme}`}
            className="table table-invoice table-info"
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="text-center">
                  No.
                </th>
                <th scope="col" className="text-center">
                  FROM
                </th>
                <th scope="col" className="text-center">
                  TO
                </th>

                <th scope="col" className="text-center">
                  TOTAL
                </th>
                <th scope="col" className="text-center">
                  DATE
                </th>
                <th scope="col" className="text-center">
                  VIEW | EDIT
                </th>
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
                        <td className="text-center">{invoiceFrom}</td>
                        <td className="text-center">{billTo}</td>

                        <td className="text-center">${subtotal}</td>
                        <td className="text-center">{date}</td>
                        <td className="text-center">
                          <Link
                            to={`/invoices/${invoiceId}`}
                            className="btn btn-primary mr-2 mb-1"
                          >
                            <BiShowAlt style={{ fontSize: '22px' }} />
                          </Link>
                          <Link
                            to={`/invoice/${invoiceId}`}
                            className="btn btn-info mr-2 mb-1"
                            onClick={() => setIsEditingInvoice(true)}
                          >
                            <AiFillEdit style={{ fontSize: '22px' }} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center my-5">
          Looks like you haven't created your first invoice yet... Create your
          first one with a few clicks! 😀
        </p>
      )}

      <Link
        to="/invoice/new"
        type="button"
        className="btn btn-info"
        onClick={() => setIsEditingInvoice(false)}
      >
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
