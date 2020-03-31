const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initDB = require('./models/db');

const api  = require('./routes/user');

initDB.createUserTable();
initDB.createTokenTable();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.set("views", __dirname + "/view");
app.use('/api',api);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

app.get('/', (req, res) => res.status(200).send({
   appName        :'Postgres Authentication Server with Express.',
   serverStatus   :'Server is running.',
   lastUpdatedTime:dateTime,
   auther         :'LT'

}));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening in http://localhost:3000`)
});
