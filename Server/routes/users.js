const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.get('/:userId', (req, res) => {
  const { userId } = req.params

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

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
    connection.release()
  })
})

//user json middleware on this unique route
router.post('/add', express.json(), (req, res) => {
  const { email, userId } = req.body

  db.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)

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

    connection.release()
  })
})

//user json middleware on this unique route
router.put('/update', express.json(), (req, res) => {
  const { userId, userMobile, userPaymentDetails, userNotes } = req.body

  db.getConnection((err, connection) => {
    if (err) throw err

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
    connection.release()
  })
})

module.exports = router
