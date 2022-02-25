import React, { useRef } from 'react'
import './styles/NewInvoice.css'

export function InvoiceTemplate() {
  const invoice = useRef(null)

  const handleClick = () => {
    window.html2pdf(invoice.current)
  }

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="invoice" ref={invoice}>
          <div className="invoice-company text-inverse f-w-600">
            Company Name, Inc
          </div>

          <div className="invoice-header">
            <div className="invoice-from">
              <small>from</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">Twitter, Inc.</strong>
                <br />
                abn: 0000000000
              </address>
            </div>
            <div className="invoice-to">
              <small>to</small>
              <address className="m-t-5 m-b-5">
                <strong className="text-inverse">Company Name</strong>
                <br />
                abn: 0000000000
              </address>
            </div>
            <div className="invoice-date">
              <small>Invoice</small>
              <div className="date text-inverse m-t-5">25/02/2022</div>
              <div className="invoice-detail">#172</div>
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
                  <tr>
                    <td>
                      <span className="text-inverse">
                        Website design &amp; development
                      </span>
                    </td>
                    <td className="text-center">$50.00</td>
                    <td className="text-center">50</td>
                    <td className="text-right">$2,500.00</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-inverse">br/anding</span>
                    </td>
                    <td className="text-center">$50.00</td>
                    <td className="text-center">40</td>
                    <td className="text-right">$2,000.00</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-inverse">Redesign Service</span>
                    </td>
                    <td className="text-center">$50.00</td>
                    <td className="text-center">50</td>
                    <td className="text-right">$2,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="invoice-price">
              <div className="invoice-price-left">
                <div className="invoice-price-row">
                  <div className="sub-price">
                    <small>SUBTOTAL</small>
                    <span className="text-inverse">$4,500.00</span>
                  </div>
                  <div className="sub-price">
                    <i className="fa fa-plus text-muted"></i>
                  </div>
                  <div className="sub-price">
                    <small>PAYPAL FEE (5.4%)</small>
                    <span className="text-inverse">$108.00</span>
                  </div>
                </div>
              </div>
              <div className="invoice-price-right">
                <small>TOTAL</small> <span className="f-w-600">$4508.00</span>
              </div>
            </div>
          </div>
          <div className="invoice-note">
            * Make all cheques payable to [Your Company Name]
            <br />
            * Payment is due within 30 days
            <br />* If you have any questions concerning this invoice, contact
            [Name, Phone Number, Email]
          </div>

          <div className="invoice-footer">
            <p className="text-center m-b-5 f-w-600">
              THANK YOU FOR YOUR BUSINESS
            </p>
            <p className="text-center">
              <span className="m-r-10">
                <i className="fa fa-fw fa-lg fa-globe"></i> matiasgallipoli.com
              </span>
              <span className="m-r-10">
                <i className="fa fa-fw fa-lg fa-phone-volume"></i>{' '}
                T:016-18192302
              </span>
              <span className="m-r-10">
                <i className="fa fa-fw fa-lg fa-envelope"></i> rtiemps@gmail.com
              </span>
            </p>
          </div>
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  )
}
