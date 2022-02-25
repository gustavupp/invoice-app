import React, { useState, useRef } from 'react'

export const NewInvoice = () => {
  const [fields, setFields] = useState([])
  const container = useRef(null)
  const handleChange = (e) => {
    e.preventDefault()
    setFields({ ...fields, [e.target.name]: e.target.value })
    console.log(fields)
    console.log(container.current)
  }
  let lineItems = Array.from(document.querySelectorAll('.line-item'))
  const addNewItem = () => {
    let newLineItem = document.createElement('div')
    newLineItem.setAttribute('class', 'line-item')
    newLineItem.innerHTML = `<label htmlFor="item">item</label>
                                <input type="text"  />`
    container.current.append(newLineItem)
    lineItems.push(newLineItem)
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
            <tr>
              <th scope="row">1</th>
              <td>
                <input
                  type="text"
                  name="service"
                  onChange={(e) => handleChange(e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hours"
                  onChange={(e) => handleChange(e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="rate"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
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
