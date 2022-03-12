const mysql = require('mysql')

//databse connection
const db = mysql.createPool({
  connectionLimit: 100,
  user: 'root',
  host: 'localhost',
  password: 'password123*',
  database: 'invoice-app',
})

module.exports = db
