import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './Context'
import { FiPhoneCall, FiMail } from 'react-icons/fi'
import './styles/invoiceTemplate.css'

export function InvoiceTemplate() {
  const { lineItems, subtotal, from, to, date, number } = useContext(AppContext)
  const invoice = useRef(null)

  const handleClick = () => {
    window.html2pdf(invoice.current)
  }

  return (
    <div className="container mt-5">
      <div className="col-md-12">
        <div className="invoice" ref={invoice}>
          <div className="invoice-company text-inverse f-w-600">LOGO</div>

          <div className="invoice-header">
            <div className="invoice-from">
              <small>from</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">{from}</strong>
              </address>
            </div>
            <div className="invoice-to">
              <small>to</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">{to}</strong>
              </address>
            </div>
            <div className="invoice-date">
              <small>Invoice</small>
              <div className="date text-inverse m-t-5">{date}</div>
              <div className="invoice-detail">#{number}</div>
            </div>
          </div>

          <div className="invoice-content">
            <div className="table-responsive">
              <table className="table table-invoice">
                <thead>
                  <tr>
                    <th>PRODUCT / SERVICE</th>
                    <th className="text-center" width="10%">
                      RATE
                    </th>
                    <th className="text-center" width="10%">
                      HOURS
                    </th>
                    <th className="text-right" width="20%">
                      LINE TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => {
                    const { service, rate, quantity, lineItemTotal } = item
                    return (
                      <tr>
                        <td>
                          <span className="text-inverse">{service}</span>
                        </td>
                        <td className="text-center">${rate}</td>
                        <td className="text-center">{quantity}</td>
                        <td className="text-right">${lineItemTotal}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="invoice-price">
              <div className="invoice-price-left">
                <div className="invoice-price-row">
                  <div className="sub-price">
                    <small>SUBTOTAL</small>
                    <span className="text-inverse">${subtotal}</span>
                  </div>
                  <div className="sub-price">
                    <i className="fa fa-plus text-muted"></i>
                  </div>
                  <div className="sub-price">
                    <small>PAYPAL FEE (0%)</small>
                    <span className="text-inverse">$0.00</span>
                  </div>
                </div>
              </div>
              <div className="invoice-price-right">
                <small>TOTAL</small>{' '}
                <span className="f-w-600">${subtotal}</span>
              </div>
            </div>
          </div>
          <div>
            <p>
              <strong>PAYMENT DETAILS:</strong>
            </p>
            <strong>WESTPAC</strong>
            <br />
            <strong>BSB:</strong> 734-013
            <br /> <strong>Account:</strong> 700201 <br />
            <strong>Name:</strong> {from}
            <hr />
            <strong>ABN: </strong> 56445110251
            <br />
            <strong>Address: </strong> 417B Kessels Road, Robertson QLD
          </div>
          <hr />
          <div>
            <p className="text-center ">
              <strong>THANK YOU {to}!</strong>
            </p>
            <p className="text-center">
              <FiPhoneCall /> 0490 532 668 | <FiMail /> xgustavux@hotmail.com
            </p>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-success mx-2">
            Back
          </Link>
          <button className="btn btn-primary mx-2" onClick={handleClick}>
            Save And Download
          </button>
        </div>
      </div>
    </div>
  )
}
