const express = require('express')
const router = express.Router()
const db = require('../db/db')
const multer = require('multer')
const path = require('path')

/*********************MULTER CONFIG**********************/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) //renames the file with a unique name and appends the original file extension through the 'path' module
  },
})

const upload = multer({ storage })
//info: https://www.npmjs.com/package/multer
/********************************************************/

//update invoices table endpoint
router.put('/update', upload.single('image'), (req, res) => {
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
})

//post request endpoint, middleware is passed as a second argument to app.post
router.post('/add', upload.single('image'), (req, res) => {
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
})

//delete endpoint
router.delete('/:invoiceId', (req, res) => {
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
})

//get endpoint
router.get('/all/:userId', (req, res) => {
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
})

module.exports = router
