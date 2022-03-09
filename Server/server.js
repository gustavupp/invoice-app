const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const multer = require('multer')
const path = require('path')
const e = require('express')
const { connect } = require('http2')
const { application } = require('express')

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

//other middlewares
app.use(cors())
app.use('/uploads', express.static('./uploads'))

//starts db connection
db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  app.get('/api/user/:userId', (req, res) => {
    console.log({ 'req-line-34': req.params })
    const { userId } = req.params

    connection.query(
      'SELECT * FROM users WHERE userId = ?',
      userId,
      (err, result) => {
        if (err) console.log(err)
        else {
          res.send(result)
        }
      }
    )
  })
  connection.release()
})

//starts db connection
db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //user json middleware on this unique route
  app.post('/api/add-user', express.json(), (req, res) => {
    console.log({ 'req-line-58': req.body })
    const { email, userId } = req.body

    connection.query(
      'INSERT INTO users (userId, email) VALUES (?, ?)',
      [userId, email],
      (err, result) => {
        if (err) console.log(err)
        else {
          res.send(result)
        }
      }
    )
  })
  connection.release()
})

//starts db connection
db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //user json middleware on this unique route
  app.put('/api/user/update', express.json(), (req, res) => {
    const { userId, userMobile, userPaymentDetails, userNotes } = req.body

    connection.query(
      'UPDATE users SET mobile = ?, paymentDetails = ?, notes = ? WHERE userId = ?',
      [userMobile, userPaymentDetails, userNotes, userId],
      (err, result) => {
        if (err) console.log(err)
        else {
          res.send(result)
        }
      }
    )
  })
  connection.release()
})

//starts db connection
db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //update invoices table endpoint
  app.put('/api/update-invoice', upload.single('image'), (req, res) => {
    console.log({ file: req.file, body: req.body })
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
  })

  connection.release()
})

db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //post request endpoint
  //middleware is passed as a second argument to app.post
  app.post('/api/add-invoice', upload.single('image'), (req, res) => {
    console.log({ body: req.body, file: req.file })
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
  })
  connection.release()
})

db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //delete endpoint
  app.delete('/api/delete/:invoiceId', (req, res) => {
    const { invoiceId } = req.params
    connection.query(
      'DELETE FROM invoices WHERE invoiceId = ?',
      invoiceId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
  })
  connection.release()
})

db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //get endpoint
  app.get('/api/get-invoices/:userId', (req, res) => {
    console.log('req-params-line-262', req.params)
    const { userId } = req.params
    connection.query(
      'SELECT * FROM invoices WHERE userId = ?',
      userId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
  })
  connection.release()
})

//get endpoint server check
app.get('/', (req, res) => {
  res.send('Server running!')
})

//start listening
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
