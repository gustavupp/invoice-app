import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../Context'
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
//import './styles/newInvoice.css'

export const NewInvoice = () => {
  const { getInvoices, invoices, isEditingInvoice } = useContext(AppContext)
  const { invoiceId } = useParams()
  const imageOutput = useRef(null)

  const [subtotal, setSubtotal] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceFrom, setInvoiceFrom] = useState('')
  const [billTo, setBillTo] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState(null)
  const [lineItems, setLineItems] = useState([])
  const [imageThumbnail, setImageThumbnail] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010'
  )

  const [lineItemTotal, setLineItemTotal] = useState(0)
  const [service, setService] = useState('')
  const [quantity, setQuantity] = useState('')
  const [rate, setRate] = useState('')

  const [editingLineItemId, setEditingLineItemId] = useState('')
  const [isEditingLineItem, setIsEditingLineItem] = useState(false)

  useEffect(() => {
    if (isEditingInvoice) {
      let {
        subtotal,
        invoiceFrom,
        billTo,
        date,
        invoiceNumber,
        image,
        lineItems,
      } = invoices.find((item) => item.invoiceId === parseInt(invoiceId))
      setSubtotal(subtotal)
      setInvoiceFrom(invoiceFrom)
      setBillTo(billTo)
      setDate(date)
      setInvoiceNumber(invoiceNumber)
      setImage(image)
      setLineItems(JSON.parse(lineItems))
    }
  }, [invoiceId])

  useEffect(() => {
    let total = lineItems?.reduce((acc, cur) => {
      acc += cur.lineItemTotal
      return acc
    }, 0)
    setSubtotal(total)
  }, [lineItems])

  //adds a line item
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
    setIsEditingLineItem(false)
  }

  useEffect(() => {
    setLineItemTotal(rate * quantity)
  }, [rate, quantity])

  //deletes a line item
  const deleteLineItem = (e, id) => {
    e.preventDefault()
    let tempLineItems = lineItems.filter((item) => item.id !== id)
    setLineItems(tempLineItems)
  }

  //edits a line item
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

  //loads image preview
  const loadImageFile = (e) => {
    //imageOutput.current.src = URL.createObjectURL(e.target.files[0])
    setImageThumbnail(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    //setImage(URL.createObjectURL(e.target.files[0]))
  }

  //posts invoice to server
  const postInvoiceToServer = async () => {
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('userId', '002') //manually adding userId

      const options = {
        method: 'POST',
        body: formData,
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

  //updates invoice on db
  const updateInvoice = async (invoiceId) => {
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('invoiceId', invoiceId)
      //formData.append('userId', '001')

      const options = {
        method: 'PUT',
        body: formData,
      }

      try {
        await fetch('http://localhost:3001/api/update-invoice', options)
          .then((res) => console.log(res))
          .then(() => getInvoices())
      } catch (error) {
        console.log(error)
      }
    }
  }

  //delete invoice from db
  const deleteInvoice = async (invoiceId) => {
    try {
      await fetch(`http://localhost:3001/api/delete/${invoiceId}`, {
        method: 'delete',
      }).then(() => getInvoices())
    } catch (error) {
      throw error
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

            <label name="image" className="custom-file-label" htmlFor="file">
              Choose Logo Image
            </label>
          </div>
        </div>

        <p>
          <img
            id="output"
            //if image variable is coming from db its value is a string(a path)
            src={
              typeof image === 'string'
                ? `http://localhost:3001/${image}`
                : imageThumbnail
            }
            alt="No image has been selected."
            width="200"
            ref={imageOutput}
          />
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
          to="/"
          className="btn btn-danger"
          onClick={() => deleteInvoice(invoiceId)}
        >
          Delete
        </Link>

        <Link
          to="/"
          className="btn btn-success"
          onClick={
            isEditingInvoice
              ? () => updateInvoice(invoiceId)
              : postInvoiceToServer
          }
        >
          Save
        </Link>
      </div>
    </main>
  )
}
