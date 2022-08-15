const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  base32: {
    type: String,
    required: true,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('userDetails', schema)
