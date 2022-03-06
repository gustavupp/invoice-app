const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
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

//other middlewares
app.use(cors())
//app.use(express.json())

//starts db connection
db.getConnection((err, connection) => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)

  //update request endpoint
  app.put('/api/update-invoice', (req, res) => {
    const {
      billTo,
      invoiceFrom,
      lineItems,
      date,
      subtotal,
      invoiceNumber,
      image,
      invoiceId,
    } = req.body

    connection.query(
      'UPDATE invoices SET billTo = ?, invoiceFrom = ?, lineItems = ?, date = ?, subtotal = ?, invoiceNumber = ?, image = ? WHERE invoiceId = ?',
      [
        billTo,
        invoiceFrom,
        lineItems,
        date,
        subtotal,
        invoiceNumber,
        image,
        invoiceId,
      ],
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
  //post request endpoint
  app.post('/api/add-invoice', upload.single('image'), (req, res) => {
    console.log({ body: req.body, file: req.file })
    const {
      invoiceFrom,
      billTo,
      invoiceNumber,
      date,
      subtotal,
      lineItems,
      image,
    } = req.body

    connection.query(
      'INSERT INTO invoices (billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, image) VALUES (?, ? , ?, ?, ?, ?, ?)',
      [billTo, invoiceFrom, lineItems, date, subtotal, invoiceNumber, image],
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
  app.get('/api/get-invoices', (req, res) => {
    connection.query('SELECT * FROM invoices', (err, result) => {
      if (err) console.log(err)
      else res.send(result)
    })
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
