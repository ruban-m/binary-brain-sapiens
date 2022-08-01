const express = require('express')
const app = express()
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/register', express.static('public'))
app.use('/register/2fa', express.static('public'))

app.set('view engine', 'ejs')

const secret = speakeasy.generateSecret()

app.get('/', (req, res) => {
  res.status(200).render('index')
})

app.get('/register', (req, res) => {
  res.status(200).render('register')
})

app.get('/register/2fa', (req, res) => {
  res.render('2fa')
})

app.get('/api', (req, res) => {
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    res.status(200).json({ base32: secret.base32, data: data })
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})
