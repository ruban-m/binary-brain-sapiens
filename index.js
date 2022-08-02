const express = require('express')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/register', express.static('public'))
app.use('/register/2fa', express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(200).render('index')
})

app.post('/verify', (req, res) => {
  res.status(200).render('verification')
  console.log(req.body)
})

app.get('/register', (req, res) => {
  res.status(200).render('register')
})

app.post('/register/2fa', (req, res) => {
  console.log(req.body)
  const secret = speakeasy.generateSecret({ name: req.body.name })
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    const obj = { base32: secret.base32, data: data }
    res.status(200).render('2fa', { obj })
  })
})

//for mongodb connection
// mongoose.connect(process.env.MONGODB_URL, (err) => {
//   if (err) {
//     console.log('Error accured' + err)
//   } else {
//     console.log('MongoDB Connection Established')
//   }
// })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Listening on http://localhost:${PORT}`))
