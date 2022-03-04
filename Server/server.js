const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

/****************************mysql connection*********************************/
const db = mysql.createPool({
  connectionLimit: 100,
  user: 'root',
  host: 'localhost',
  password: 'password123*',
  database: 'invoice-app',
})
/****************************mysql connection*********************************/

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

    db.query(
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

  //post request endpoint
  app.post('/api/add-invoice', (req, res) => {
    const {
      invoiceFrom,
      billTo,
      invoiceNumber,
      date,
      subtotal,
      lineItems,
      image,
    } = req.body
    db.query(
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

  //delete endpoint
  app.delete('/api/delete/:invoiceId', (req, res) => {
    const { invoiceId } = req.params
    db.query(
      'DELETE FROM invoices WHERE invoiceId = ?',
      invoiceId,
      (err, result) => {
        if (err) console.log(err)
        else res.send(result)
      }
    )
  })

  //get endpoint
  app.get('/api/get-invoices', (req, res) => {
    db.query('SELECT * FROM invoices', (err, result) => {
      if (err) console.log(err)
      else res.send(result)
    })
  })

  //get endpoint
  app.get('/', (req, res) => {
    res.send('Server running!')
  })
})

//start listening
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
