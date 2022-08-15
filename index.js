const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use('/register', express.static('public'))
app.use('/register/2fa', express.static('public'))

app.use('/register', require('./routes/registerRouter'))
app.use('/verify', require('./routes/loginRouter'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

//for mongodb connection
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    console.log('Error accured' + err)
  } else {
    console.log('MongoDB Connection Established')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Listening on http://localhost:${PORT}`))
