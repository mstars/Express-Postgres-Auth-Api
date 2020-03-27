const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Server is running.'
}));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening in http://localhost:3000`)
})
