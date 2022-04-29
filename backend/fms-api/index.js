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
// const dbHost = process.env.DB_HOST
// const dbUser = process.env.DB_USER
// const dbPassword = process.env.DB_PASS
// const dbDatabase = process.env.DB_NAME

// ========== Local ==========
const dbHost = 'localhost'
const dbUser = 'root'
const dbPassword = 'root'
const dbDatabase = 'fms'

// ========== /connectAPI ==========
app.get('/connectAPI', (req, res) => {
  res.status(200).json({
    message: 'Success',
  })
})

// ========== /userList ==========
app.get('/userList', (req, res) => {
  console.log('/userList');
  // var userList = []
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = 'SELECT * FROM users'
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     userList = result
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: userList,
  //     })
  //   }
  // });

  // con.end();


  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: [
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Jetnipat",
        "last_name": "Prakobna",
        "email": "jetza1769@gmail.com",
        "phone": "0812345678",
        "username": "jet",
        "password": "1234",
        "is_active": true,
        "is_admin": true,
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Supattalak",
        "last_name": "Phoha",
        "email": "supattalak@gmail.com",
        "phone": "0812345678",
        "username": "coke",
        "password": "1234",
        "is_active": true,
        "is_admin": true,
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Hattayakorn",
        "last_name": "Aupati",
        "email": "hattayakorn@gmail.com",
        "phone": "0812345678",
        "username": "panza",
        "password": "1234",
        "is_active": true,
        "is_admin": false,
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Khaopoon",
        "last_name": "Poonpon",
        "email": "khaopoon@gmail.com",
        "phone": "0812345678",
        "username": "khaopoon",
        "password": "1234",
        "is_active": true,
        "is_admin": false,
      }
    ],
  })
  // =============================
})

// ========== /fileList ==========
app.get('/fileList', (req, res) => {
  console.log('/fileList');
  // var fileList = []
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = 'SELECT * FROM files'
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     fileList = result
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: fileList,
  //     })
  //   }
  // });

  // con.end();


  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: [
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test01.pdf",
        "file_type": "pdf",
        "file_size": "12 MB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test02.pdf",
        "file_type": "pdf",
        "file_size": "1 MB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test03.pdf",
        "file_type": "pdf",
        "file_size": "120 KB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test04.json",
        "file_type": "json",
        "file_size": "10 KB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test05.jpg",
        "file_type": "jpg",
        "file_size": "12 MB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test06.pdf",
        "file_type": "pdf",
        "file_size": "1 MB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test07.png",
        "file_type": "png",
        "file_size": "120 KB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      },
      {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "file_name": "test08.json",
        "file_type": "json",
        "file_size": "10 KB.",
        "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "create_date": "2022-04-30"
      }
    ],
  })
  // =============================
})

// ========== /login/:username/:password ==========
app.get('/login/:username/:password', (req, res) => {
  // var username = req.params.username
  // var password = req.params.password
  // var user = {}
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "' AND is_active = 1";
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     user = result[0]
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: user,
  //     })
  //   }
  // });

  // con.end();

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Supattalak",
        "last_name": "Phoha",
        "email": "supattalak@gmail.com",
        "phone": "0812345678",
        "username": "coke",
        "password": "1234",
        "is_active": "1",
        "is_admin": "1",
      }
  })
  // =============================
})

// ========== /userById/:id ==========
app.get('/userById/:id', (req, res) => {
  console.log("/userById/:id");
  // var id = req.params.id
  // var user = {}
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = "SELECT * FROM users WHERE id = '" + id + "'";
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     user = result[0]
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: user,
  //     })
  //   }
  // });

  // con.end();

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: {
        "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
        "first_name": "Supattalak",
        "last_name": "Phoha",
        "email": "supattalak@gmail.com",
        "phone": "0812345678",
        "username": "coke",
        "password": "1234",
        "is_active": "1",
        "is_admin": "1",
      }
  })
  // =============================
})

// ========== /createUser ==========
app.post('/createUser', (req, res) => {
  console.log('/createUser');
  // var reqObj = req.body
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')

  //   var sql = 'INSERT INTO users VALUES(' +
  //     "'" + reqObj.id + "', " +
  //     "'" + reqObj.firstName + "', " +
  //     "'" + reqObj.lastName + "', " +
  //     "'" + reqObj.email + "', " +
  //     "'" + reqObj.phone + "', " +
  //     "'" + reqObj.userName + "', " +
  //     "'" + reqObj.password + "', 1,0" +
  //     ')'

  //   con.query(sql, function (err, result) {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(result)
  //       console.log(result[0])
  //       user = result[0]
  //       console.log(user)
  //       res.status(200).json({
  //         message: 'เรียกข้อมูลสำเร็จ',
  //         data: user,
  //       })
  //     }
  //   })

  //   con.end()
  // })

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: true
  })
  // =============================
})

// ========== /updateUser ==========
app.put('/updateUser', (req, res) => {
  console.log('/updateUser');
  // var reqObj = req.body
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')

  //   var sql = 'UPDATE users SET' +
  //     "first_name = '" + reqObj.firstName + "', " +
  //     "lase_name = '" + reqObj.lastName + "', " +
  //     "email = '" + reqObj.email + "', " +
  //     "phone = '" + reqObj.phone + "', " +
  //     "username = '" + reqObj.userName + "', " +
  //     "password = '" + reqObj.password + "', " +
  //     "is_active = " + reqObj.isActive + ", " +
  //     "ia_admin = " + reqObj.isAdmin + " " +
  //     "WHERE id = " + reqObj.id

  //   con.query(sql, function (err, result) {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       res.status(200).json({
  //         message: 'เรียกข้อมูลสำเร็จ',
  //         data: true,
  //       })
  //     }
  //   })

  //   con.end()
  // })

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: true
  })
  // =============================
})

// ========== /deleteUser/:id ==========
app.delete('/deleteUser/:id', (req, res) => {
  console.log('/deleteUser/:id');
  // var id = req.params.id
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = "DELETE FROM users WHERE id = '" + id + "'";
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: true,
  //     })
  //   }
  // });

  // con.end();

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: true
  })
  // =============================
})

// ========== /deleteFile/:id ==========
app.delete('/deleteFile/:id', (req, res) => {
  console.log('/deleteFile/:id');
  // var id = req.params.id
  // var mysql = require('mysql')
  // var con = mysql.createConnection({
  //   host: dbHost,
  //   user: dbUser,
  //   password: dbPassword,
  //   database: dbDatabase,
  // })

  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('You are connected!')
  // });

  // var sql = "DELETE FROM files WHERE id = '" + id + "'";
  // con.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     res.status(200).json({
  //       message: 'เรียกข้อมูลสำเร็จ',
  //       data: true,
  //     })
  //   }
  // });

  // con.end();

  // ========= Mock ==========
  res.status(200).json({
    message: 'เรียกข้อมูลสำเร็จ',
    data: true
  })
  // =============================
})

app.use(
  express.static(path.join(__dirname, '../../fms-web-main/projectjs/dist')),
)

app.listen(3000, (err) => {
  err
    ? console.log('Fail to Start Server')
    : console.log('Server start at 3000')
})
