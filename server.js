const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const api  = require('./routes/user');
const pool  = require('./models/dbconnection');
const userController  = require('./controllers/user');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',api);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

app.get('/', (req, res) => res.status(200).send({
   appName        :'Postgres authentication server with express.',
   serverStatus   :'Server is running.',
   lastUpdatedTime:dateTime,
   auther         :'LT',
   api            :'/api/v1/user/createAccount , /api/v1/user/login'

}));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening in http://localhost:3000`)
});
