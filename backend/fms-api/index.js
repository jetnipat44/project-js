const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const bp = require('body-parser')

require('dotenv').config()

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// ========== Production ==========
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbDatabase = process.env.DB_NAME

// ========== Local ==========
// const dbHost = 'localhost'
// const dbUser = 'root'
// const dbPassword = 'root'
// const dbDatabase = 'fms'

// ========== /connectAPI ==========
app.get('/connectAPI', (req, res) => {
  res.status(200).json({
    message: 'Success',
  })
})

// ========== /userList ==========
app.get('/userList', (req, res) => {
  var userList = []
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
  })

  con.connect(function (err) {
    if (err) throw err
    console.log('You are connected!')
  });

  var sql = 'SELECT * FROM users'
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      userList = result
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: userList,
      })
    }
  });

  con.end();
})

// ========== /login/:username/:password ==========
app.get('/login/:username/:password', (req, res) => {
  var username = req.params.username
  var password = req.params.password
  var user = {}
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
  })

  con.connect(function (err) {
    if (err) throw err
    console.log('You are connected!')
  });

  var sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      user = result[0]
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: user,
      })
    }
  });

  con.end();
})

// ========== /createUser ==========
app.post('/createUser', (req, res) => {
  var reqObj = req.body
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
  })

  con.connect(function (err) {
    if (err) throw err
    console.log('You are connected!')

    var sql = 'INSERT INTO users VALUES(' +
      "'" + reqObj.id + "', " +
      "'" + reqObj.firstName + "', " +
      "'" + reqObj.lastName + "', " +
      "'" + reqObj.email + "', " +
      "'" + reqObj.phoneName + "', " +
      "'" + reqObj.userName + "', " +
      "'" + reqObj.password + "', 1,0" +
      ')'

    con.query(sql, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        console.log(result[0])
        user = result[0]
        console.log(user)
        res.status(200).json({
          message: 'เรียกข้อมูลสำเร็จ',
          data: user,
        })
      }
    })

    con.end()
  })
})

app.use(
  express.static(path.join(__dirname, '../../fms-web-main/projectjs/dist')),
)

app.listen(3000, (err) => {
  err
    ? console.log('Fail to Start Server')
    : console.log('Server start at 3000')
})
