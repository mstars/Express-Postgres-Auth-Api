const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./models/dbconnection')
const { userController } = require('./controllers/user')
const router = express.Router();

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// when a random route is inputed
app.get('/', (req, res) => res.status(200).send({
   appName        :'Postgres authentication server with express.',
   serverStatus   :'Server is running.',
   lastUpdatedTime:dateTime,
   auther         :'LT'
}));


  app.route('/auth')
    // GET endpoint
    router.get(userController.login)
    // POST endpoint
    router.post(userController.createAccount)


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening in http://localhost:3000`)
})
