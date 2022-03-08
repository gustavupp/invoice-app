import React from 'react'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  return (
    <main className="container my-5 py-3">
      <h3>User Default Settings</h3>
      <form>
        <section className="row my-5">
          <div className="form-group col-sm">
            <label htmlFor="mobile">Phone</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="invoiceNumber"
                readOnly
                placeholder="user@email.com"
              />
            </div>
          </div>
        </section>

        <section className="row my-4">
          <div className="form-group col-sm">
            <label htmlFor="paymentDetails">Payment Details</label>
            <textarea
              className="form-control"
              id="paymentDetails"
              name="paymentDetails"
              rows="4"
              placeholder="Any payment details?"
            />
          </div>

          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                id="notes"
                rows="4"
                placeholder="Any notes?"
              />
            </div>
          </div>
        </section>
      </form>
      <p>
        * All information added here will be automatically prefilled on your
        invoices
      </p>

      <div className="d-flex justify-content-between m-2">
        <Link to="/" className="btn btn-success">
          Back
        </Link>
      </div>
    </main>
  )
}

export default UserInfo
