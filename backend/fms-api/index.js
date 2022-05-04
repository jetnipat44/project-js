const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const bp = require('body-parser')
// const fs = require('fs')
// require('dotenv').config()
const axios = require('axios')
// const formData = require('express-form-data')
// const multer = require('multer');
// const upload = multer({
//   dest: 'files'
// });

const app = express()
// app.use(formData.parse());

app.set('view engine', 'ejs')
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(fileupload())
//========== Production ==========
// const dbHost = process.env.DB_HOST
// const dbUser = process.env.DB_USER
// const dbPassword = process.env.DB_PASS
// const dbDatabase = process.env.DB_NAME

// ========== Local ==========
const dbHost = 'localhost'
const dbUser = 'root'
const dbPassword = '1234'
const dbDatabase = 'fms'

// ========== /upload ==========
app.post('/uploadFileToOpenProject', (req, res) => {
  if (req.files) {
    var file = req.files.file
    const FormData = require('form-data')
    let formData = new FormData()
    formData.append('metadata', '{"fileName":"' + file.name + '"}')
    formData.append('file', file.data, { filename: file.name })

    axios
      .post('https://community.openproject.org/api/v3/attachments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (resp) {
        console.log(resp.data)
        res.status(200).json({
          message: resp.data._links.downloadLocation.href,
        })
      })
      .catch(function (error) {
        console.log(error)
        res.status(400).json({
          message: error,
        })
      })
  } else {
    res.status(400).json({
      message: 'ไม่พบไฟล์',
    })
  }
})

// ========== /uploadFile ==========
app.post('/uploadFile', (req, res) => {
  console.log('/uploadFile')
  var fileObj = req.files.file
  console.log(fileObj)
  var createBy = req.body.userLogin
  var ref = req.body.ref
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

    var sql =
      'INSERT INTO files VALUES(' +
      ' uuid() ' +
      ', ' +
      "'" +
      fileObj.name +
      "', " +
      "'" +
      fileObj.mimetype +
      "', " +
      ' ' +
      fileObj.size +
      ', ' +
      "'" +
      ref +
      "', " +
      "'" +
      createBy +
      "', CURRENT_TIME()) "

    con.query(sql, function (err, result) {
      if (err) {
        console.log(err)
        res.status(400).json({
          message: err,
          data: false,
        })
      } else {
        res.status(200).json({
          message: 'เรียกข้อมูลสำเร็จ',
          data: true,
        })
      }
    })

    con.end()
  })
})

// ========== /connectAPI ==========
app.get('/connectAPI', (req, res) => {
  res.status(200).json({
    message: 'Success',
  })
})

// ========== /userList ==========
app.get('/userList', (req, res) => {
  console.log('/userList')
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
  })

  var sql =
    "SELECT u.*,fileGroup.totalSize FROM users u LEFT JOIN (SELECT f.create_by,SUM(f.file_size) AS 'totalSize' FROM files f GROUP BY f.create_by) fileGroup ON u.id = fileGroup.create_by"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      var obj = []
      result.forEach((element) => {
        if (element.is_active == 1) {
          element.is_active = true
        } else {
          element.is_active = false
        }
        if (element.is_admin == 1) {
          element.is_admin = true
        } else {
          element.is_admin = false
        }
        obj.push(element)
      })
      userList = obj

      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: userList,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: [
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "first_name": "Jetnipat",
  //       "last_name": "Prakobna",
  //       "email": "jetza1769@gmail.com",
  //       "phone": "0812345678",
  //       "username": "jet",
  //       "password": "1234",
  //       "is_active": true,
  //       "is_admin": true,
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "first_name": "Supattalak",
  //       "last_name": "Phoha",
  //       "email": "supattalak@gmail.com",
  //       "phone": "0812345678",
  //       "username": "coke",
  //       "password": "1234",
  //       "is_active": true,
  //       "is_admin": true,
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "first_name": "Hattayakorn",
  //       "last_name": "Aupati",
  //       "email": "hattayakorn@gmail.com",
  //       "phone": "0812345678",
  //       "username": "panza",
  //       "password": "1234",
  //       "is_active": true,
  //       "is_admin": false,
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "first_name": "Khaopoon",
  //       "last_name": "Poonpon",
  //       "email": "khaopoon@gmail.com",
  //       "phone": "0812345678",
  //       "username": "khaopoon",
  //       "password": "1234",
  //       "is_active": true,
  //       "is_admin": false,
  //     }
  //   ],
  // })
  // // =============================
})

// ========== /fileList ==========
app.get('/fileList/:userLogin', (req, res) => {
  console.log('/fileList')
  var userLogin = req.params.userLogin
  var fileList = []
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
  })

  var sql =
    "SELECT f.id,f.file_name,f.file_type,f.file_size,f.ref,u.first_name AS create_by,f.create_date FROM files f LEFT JOIN users u ON f.create_by = u.id  WHERE f.create_by = '" +
    userLogin +
    "' ORDER BY f.create_date DESC"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      fileList = result
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: fileList,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: [
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test01.pdf",
  //       "file_type": "pdf",
  //       "file_size": "12 MB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test02.pdf",
  //       "file_type": "pdf",
  //       "file_size": "1 MB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test03.pdf",
  //       "file_type": "pdf",
  //       "file_size": "120 KB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test04.json",
  //       "file_type": "json",
  //       "file_size": "10 KB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test05.jpg",
  //       "file_type": "jpg",
  //       "file_size": "12 MB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test06.pdf",
  //       "file_type": "pdf",
  //       "file_size": "1 MB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test07.png",
  //       "file_type": "png",
  //       "file_size": "120 KB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     },
  //     {
  //       "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "file_name": "test08.json",
  //       "file_type": "json",
  //       "file_size": "10 KB.",
  //       "ref": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_by": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //       "create_date": "2022-04-30"
  //     }
  //   ],
  // })
  // // =============================
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
  })

  var sql =
    "SELECT * FROM users WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "' AND is_active = 1"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      user = result[0]
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: user,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: {
  //     "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //     "first_name": "Supattalak",
  //     "last_name": "Phoha",
  //     "email": "supattalak@gmail.com",
  //     "phone": "0812345678",
  //     "username": "coke",
  //     "password": "1234",
  //     "is_active": "1",
  //     "is_admin": "1",
  //   }
  // })
  // // =============================
})

// ========== /userById/:id ==========
app.get('/userById/:id', (req, res) => {
  console.log('/userById/:id')
  var id = req.params.id
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
  })

  var sql = "SELECT * FROM users WHERE id = '" + id + "'"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      user = result[0]
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: user,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: {
  //     "id": "514c61b0-e51f-48f6-8e6c-dda6076b435f",
  //     "first_name": "Supattalak",
  //     "last_name": "Phoha",
  //     "email": "supattalak@gmail.com",
  //     "phone": "0812345678",
  //     "username": "coke",
  //     "password": "1234",
  //     "is_active": "1",
  //     "is_admin": "1",
  //   }
  // })
  // // =============================
})

// ========== /createUser ==========
app.post('/createUser', (req, res) => {
  console.log('/createUser')
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

    var sql =
      'INSERT INTO users VALUES(' +
      "'" +
      reqObj.id +
      "', " +
      "'" +
      reqObj.firstName +
      "', " +
      "'" +
      reqObj.lastName +
      "', " +
      "'" +
      reqObj.email +
      "', " +
      "'" +
      reqObj.phone +
      "', " +
      "'" +
      reqObj.userName +
      "', " +
      "'" +
      reqObj.password +
      "', 1,0" +
      ')'

    con.query(sql, function (err, result) {
      if (err) {
        console.log(err)
        res.status(400).json({
          message: err,
        })
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

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: true
  // })
  // // =============================
})

// ========== /updateUser ==========
app.put('/updateUser', (req, res) => {
  console.log('/updateUser')
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

    var sql =
      'UPDATE users SET ' +
      "first_name = '" +
      reqObj.firstName +
      "', " +
      "last_name = '" +
      reqObj.lastName +
      "', " +
      "email = '" +
      reqObj.email +
      "', " +
      "phone = '" +
      reqObj.phone +
      "', " +
      "username = '" +
      reqObj.userName +
      "', " +
      "password = '" +
      reqObj.password +
      "', " +
      'is_active = ' +
      reqObj.isActive +
      ', ' +
      'is_admin = ' +
      reqObj.isAdmin +
      ' ' +
      "WHERE id = '" +
      reqObj.id +
      "'"

    con.query(sql, function (err, result) {
      if (err) {
        console.log(err)
        res.status(400).json({
          message: err,
        })
      } else {
        res.status(200).json({
          message: 'เรียกข้อมูลสำเร็จ',
          data: true,
        })
      }
    })

    con.end()
  })

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: true
  // })
  // // =============================
})

// ========== /deleteUser/:id ==========
app.delete('/deleteUser/:id', (req, res) => {
  console.log('/deleteUser/:id')
  var id = req.params.id
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
  })
  console.log(id)
  var sql = "DELETE FROM users WHERE id = '" + id + "'"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: true,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: true
  // })
  // // =============================
})

// ========== /deleteFile/:id ==========
app.delete('/deleteFile/:id', (req, res) => {
  console.log('/deleteFile/:id')
  var id = req.params.id
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
  })

  var sql = "DELETE FROM files WHERE id = '" + id + "'"
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({
        message: err,
      })
    } else {
      res.status(200).json({
        message: 'เรียกข้อมูลสำเร็จ',
        data: true,
      })
    }
  })

  con.end()

  // // ========= Mock ==========
  // res.status(200).json({
  //   message: 'เรียกข้อมูลสำเร็จ',
  //   data: true
  // })
  // // =============================
})

app.use(
  express.static(path.join(__dirname, '../../fms-web-main/projectjs/dist')),
)

app.listen(3000, (err) => {
  err
    ? console.log('Fail to Start Server')
    : console.log('Server start at 3000')
})
