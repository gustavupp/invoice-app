import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../Context'
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
//import './styles/newInvoice.css'

export const NewInvoice = () => {
  const { getInvoices } = useContext(AppContext)

  const imageOutput = useRef(null)

  const [subtotal, setSubtotal] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceFrom, setInvoiceFrom] = useState('')
  const [billTo, setBillTo] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')
  const [lineItems, setLineItems] = useState([])
  const [lineItemTotal, setLineItemTotal] = useState(0)
  const [service, setService] = useState('')
  const [quantity, setQuantity] = useState('')
  const [rate, setRate] = useState('')
  const [editingLineItemId, setEditingLineItemId] = useState('')
  const [isEditingLineItem, setIsEditingLineItem] = useState(false)

  useEffect(() => {
    let total = lineItems?.reduce((acc, cur) => {
      acc += cur.lineItemTotal
      return acc
    }, 0)
    setSubtotal(total)
  }, [lineItems])

  const addLineItem = () => {
    if (isEditingLineItem) {
      let updatedItemList = lineItems.map((item) => {
        if (item.id === editingLineItemId) {
          item.service = service
          item.rate = rate
          item.quantity = quantity
          item.lineItemTotal = lineItemTotal
        }
        return item
      })
      setLineItems(updatedItemList)
    } else if (quantity && rate) {
      let newItem = {
        id: Date.now(),
        service,
        quantity,
        rate,
        lineItemTotal,
      }
      setLineItems([...lineItems, newItem])
    }
    //reset fields
    setQuantity('')
    setRate('')
    setLineItemTotal(0)
    setService('')
  }

  useEffect(() => {
    setLineItemTotal(rate * quantity)
  }, [rate, quantity])

  const deleteLineItem = (e, id) => {
    e.preventDefault()
    let tempLineItems = lineItems.filter((item) => item.id !== id)
    setLineItems(tempLineItems)
  }

  const editLineItem = (e, id) => {
    e.preventDefault()
    let editingLineItem = lineItems.find((item) => item.id === id)

    setRate(editingLineItem.rate)
    setQuantity(editingLineItem.quantity)
    setService(editingLineItem.service)
    setLineItemTotal(editingLineItem.lineItemTotal)
    setEditingLineItemId(editingLineItem.id)
    setIsEditingLineItem(true)
  }

  const loadImageFile = (e) => {
    imageOutput.current.src = URL.createObjectURL(e.target.files[0])
    let image = URL.createObjectURL(e.target.files[0])
    setImage(image)
  }

  //sends invoice to server
  const postInvoiceToServer = async () => {
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          invoiceFrom,
          billTo,
          invoiceNumber,
          date,
          image,
          subtotal,
          lineItems: JSON.stringify(lineItems),
        }),
      }

      try {
        await fetch('http://localhost:3001/api/add-invoice', options)
          .then((res) => console.log(res))
          .then(() => getInvoices())
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="container my-5 py-3">
      <form>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Upload</span>
          </div>
          <div className="custom-file">
            <input
              type="file"
              accept="image/*"
              name="image"
              className="custom-file-input"
              id="file"
              onChange={loadImageFile}
            />

            <label className="custom-file-label" htmlFor="file">
              Choose Logo Image
            </label>
          </div>
        </div>

        <p>
          <img id="output" width="200" ref={imageOutput} />
        </p>
        <section className="row mb-3">
          <div className="form-group col-sm">
            <label htmlFor="invoiceFrom">From</label>
            <input
              type="text"
              className="form-control "
              id="invoiceFrom"
              name="invoiceFrom"
              value={invoiceFrom}
              onChange={(e) => setInvoiceFrom(e.target.value)}
              placeholder="Who is this invoice from?"
            />
          </div>
          <div className="form-group col-sm">
            <label htmlFor="billTo">Bill To</label>
            <input
              type="text"
              className="form-control"
              id="billTo"
              name="billTo"
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
              placeholder="Who is this invoice to?"
            />
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="number">Invoice Number</label>
              <input
                type="number"
                className="form-control"
                id="number"
                name="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="#1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="table-responsive ">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
                <th scope="col">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder=" Description of service..."
                  />
                </td>
                <td>
                  <input
                    style={{ width: '50px' }}
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder=" Quantity"
                  />
                </td>
                <td>
                  <input
                    style={{ width: '70px' }}
                    type="number"
                    name="rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder=" $"
                  />
                </td>
                <td>${lineItemTotal}</td>
              </tr>

              {lineItems &&
                lineItems.map((item, index) => {
                  const { service, quantity, rate, lineItemTotal, id } = item
                  return (
                    <tr key={index}>
                      <td>{service}</td>
                      <td>{quantity} </td>
                      <td>{rate}</td>
                      <td>${lineItemTotal}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={(e) => editLineItem(e, id)}
                        >
                          <AiFillEdit />
                        </button>
                        <button
                          className="btn"
                          onClick={(e) => deleteLineItem(e, id)}
                        >
                          <AiOutlineClose />
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </section>

        {
          <button
            className="btn btn-primary mr-3"
            type="button"
            id="btn"
            onClick={addLineItem}
          >
            {isEditingLineItem ? 'Save' : '+ Item'}
          </button>
        }
      </form>

      <div className="d-flex justify-content-end m-2">
        <h5>Subtotal:&nbsp; </h5>
        <h5> ${subtotal}</h5>
      </div>

      <div className="d-flex justify-content-between m-2">
        <Link to="/" className="btn btn-success">
          Back
        </Link>
        <Link
          to="/invoices/new"
          className="btn btn-success"
          onClick={postInvoiceToServer}
        >
          Generate Invoice
        </Link>
      </div>
    </main>
  )
}
