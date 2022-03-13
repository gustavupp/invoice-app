const db = require('../db/db')

const updateInvoice = (req, res) => {
  console.log({ file: req.file, body: req.body })

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    //if there is a req.file
    if (req.file) {
      const {
        billTo,
        invoiceFrom,
        lineItems,
        date,
        subtotal,
        invoiceNumber,
        invoiceId,
        paymentDetails,
        notes,
      } = req.body
      const image = req.file.path

      connection.query(
        'UPDATE invoices SET billTo = ?, invoiceFrom = ?, lineItems = ?, date = ?, subtotal = ?, invoiceNumber = ?, image = ?, paymentDetails = ?, notes = ? WHERE invoiceId = ?',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          image,
          paymentDetails,
          notes,
          invoiceId,
        ],
        (err, result) => {
          if (err) console.log(err)
          else res.send(result)
        }
      )
    } else {
      //if there is no req.file
      const {
        billTo,
        invoiceFrom,
        lineItems,
        date,
        subtotal,
        invoiceNumber,
        invoiceId,
        paymentDetails,
        notes,
      } = req.body

      connection.query(
        'UPDATE invoices SET billTo = ?, invoiceFrom = ?, lineItems = ?, date = ?, subtotal = ?, invoiceNumber = ?, paymentDetails = ?, notes = ? WHERE invoiceId = ?',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          paymentDetails,
          notes,
          invoiceId,
        ],
        (err, result) => {
          if (err) console.log(err)
          else res.send(result)
        }
      )
    }
    connection.release()
  })
}

const addInvoice = (req, res) => {
  console.log({ body: req.body, file: req.file })

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    //if there is a file type
    if (req.file) {
      const {
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        lineItems,
        userId,
        paymentDetails,
        notes,
      } = req.body
      const image = req.file.path
      connection.query(
        'INSERT INTO invoices (billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, userId, image, paymentDetails, notes) VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          userId,
          image,
          paymentDetails,
          notes,
        ],
        (err, result) => {
          if (err) console.log(err)
          else {
            res.send(result)
          }
        }
      )
    } else {
      //if there is not a file type
      const {
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        lineItems,
        userId,
        paymentDetails,
        notes,
      } = req.body

      connection.query(
        'INSERT INTO invoices (billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, userId, paymentDetails, notes) VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?)',
        [
          billTo,
          invoiceFrom,
          lineItems,
          date,
          subtotal,
          invoiceNumber,
          userId,
          paymentDetails,
          notes,
        ],
        (err, result) => {
          if (err) console.log(err)
          else {
            res.send(result)
          }
        }
      )
    }
    connection.release()
  })
}

const deleteInvoice = (req, res) => {
  const { invoiceId } = req.params

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    connection.query(
      'DELETE FROM invoices WHERE invoiceId = ?',
      invoiceId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
    connection.release()
  })
}

const getInvoices = (req, res) => {
  const { userId } = req.params

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

    connection.query(
      'SELECT * FROM invoices WHERE userId = ?',
      userId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
    connection.release()
  })
}

module.exports = { updateInvoice, addInvoice, deleteInvoice, getInvoices }
