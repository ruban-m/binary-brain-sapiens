const express = require('express')
const router = express.Router()
const userDetails = require('../model/model')

const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

router.get('/', (req, res) => {
  res.render('register')
})

let details
router.post('/2fa', async (req, res) => {
  const secret = speakeasy.generateSecret({ name: req.body.name })
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    const obj = { base32: secret.base32, data: data }
    res.render('2fa', { obj })
    details = new userDetails({
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      base32: secret.base32,
    })
  })
})

router.post('/2fa/2faverify', async (req, res) => {
  const verified = speakeasy.totp.verify({ secret: details.base32, encoding: 'base32', token: req.body.verification_code })
  if (verified) {
    await details.save()
    res.send('registor success')
  } else {
    res.send('incorrect')
  }
})

module.exports = router
