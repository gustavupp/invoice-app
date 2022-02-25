import React, { useState, useRef } from 'react'
import LineItem from './LineItem'

export const NewInvoice = () => {
  const [fields, setFields] = useState([])
  const [num, setNum] = useState(1)
  const container = useRef(null)
  const lineItems = []

  const handleChange = (e) => {
    e.preventDefault()
    setFields({ ...fields, [e.target.name]: e.target.value })
    console.log(fields)
  }

  const addNewItem = () => {
    setNum((num) => num + 1)
  }

  return (
    <main className="container">
      <form className="container">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Service</th>
              <th scope="col">Hours</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: num }).map((_, index) => (
              <LineItem key={index} index={index} handleChange={handleChange} />
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-primary mr-3"
          type="button"
          id="btn"
          onClick={addNewItem}
        >
          New Item
        </button>
        <button className="btn btn-success" type="submit" id="submit">
          Submit
        </button>
      </form>
    </main>
  )
}
