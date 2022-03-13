const db = require('../db/db')

const getUser = (req, res) => {
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
}

const addUser = (req, res) => {
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
}

const updateUser = (req, res) => {
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
}

module.exports = {
  getUser,
  addUser,
  updateUser,
}
