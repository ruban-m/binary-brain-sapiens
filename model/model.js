const mongoose = require('mongoose')

const schema = mongoose.Schema({
  phone: {
    type: number,
    required: true,
  },
  password: {
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

module.exports = mongoose.model('Facultydetails', schema)
