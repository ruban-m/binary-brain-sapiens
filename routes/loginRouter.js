const express = require('express')
const router = express.Router()
const userDetails = require('../model/model')
const speakeasy = require('speakeasy')

let details
router.post('/', async (req, res) => {
  details = await userDetails.findOne({ phone: req.body.number, confirm_password: req.body.password })
  if (details) {
    res.render('verification')
  } else {
    res.send('users not found')
  }
})

router.post('/dashboard', (req, res) => {
  const verified = speakeasy.totp.verify({ secret: details.base32, encoding: 'base32', token: req.body.verification_code })
  if (verified) {
    res.send('home')
  } else {
    res.send('incorrect')
  }
})
module.exports = router
