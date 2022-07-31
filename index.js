const express = require('express')
const app = express()
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

// const path = require('path')

// const cors = require('cors')
// app.use(cors())

app.use(express.static('public'))
// app.use('/register', express.static(path.join(__dirname, 'public')))

const secret = speakeasy.generateSecret()

app.get('/', (req, res) => {
  res.sendFile('index')
})

app.get('/register', (req, res) => {
  res.sendFile('register.html')
})

app.get('/register/2fa', (req, res) => {
  // res.sendFile('2fa.html')
  res.send('hi')
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
