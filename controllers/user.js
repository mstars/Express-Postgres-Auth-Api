var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { pool } = require('./../models/dbconnection');

const saltRounds = 10;

class userController {
  async doLogin(request, response) {
    const { uname, password } = request.body
    const client = await pool.connect().catch(err => {
      console.log(err);
    })
    try {
      client.query("SELECT * FROM auth_tab WHERE uname= $1", [uname], async (error, results) => {
        if (error) {
          return response.status(201).json({ status: 'failed', message: 'Login unsuccesful.', error })
        }
        if (results.rows.length<1) {
          return response.status(201).json({ status: 'failed', message: 'Login unsuccesful. Reason: uname incorrect.', error })
        }
        else if (results.rows[0].uname == uname && await bcrypt.compare(password, results.rows[0].password)) {
          const token = jwt.sign({uname: uname},
            process.env.JWT_KEY,
            { expiresIn: '24h' // expires in 24 hours
             });
          return response.status(201).json({ status: 'sucess', message: 'Login succesfully.', token:token })
        }
        else {
          return response.status(201).json({ status: 'failed', message: 'Login unsuccesfully. Reason: password incorrect.' })
        }
      })
    }
    catch (err) {
      return response.status(400).send({
        status: 'failed',
        message: 'Unforseen error occured.',
        error: err
      })
    }
    finally {
      client.release();
    }
  }

  async doCreateAccount(request, response) {
    const { uname, password } = request.body;

    const client = await pool.connect().catch(err => {
      console.log(err);
    })
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds).catch(err=>{
        console.log(err);
      })
      client.query("INSERT INTO auth_tab (uname, password) VALUES ($1, $2)", [uname, hashedPassword], error => {
        if (error) {
          // throw error
          if (error.code == '23505') {
            return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username already taken.' })
          }
          if (error.code == '23502') {
            return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username can not be null.' })
          }
          console.log(error);
          return response.status(201).json({ status: 'failed', message: 'Registered unsuccesfully.', error })
        }
        return response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
      })
    }
    catch (err) {
      return response.status(400).send({
        status: 'failed',
        message: 'Unforseen error occured.',
        error: err
      })
    }
    finally {
      client.release();
    }
  }
}


module.exports = new userController
