const express = require('express')
const app = express()
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

const secret = speakeasy.generateSecret()

app.get('/', (req, res) => {
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    res.status(200).json({ base32: secret.base32, data: data })
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})
