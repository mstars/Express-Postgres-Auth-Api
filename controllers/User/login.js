var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
require('dotenv').config()
const { pool } = require('./../../models/dbconnection');
const mailer = require('./../mailer/mailer');

const saltRounds = 10;

async function doLogin(request, response) {
        const { uname, password } = request.body
        const client = await pool.connect().catch(err => {
        })
        try {
          client.query("SELECT * FROM auth_tab WHERE uname= $1", [uname], async (error, results) => {
            const switchtatusChecker = results.rows[0].status;
            if (error) {
              return response.status(201).json({ status: 'failed', message: 'Login unsuccessful.', error })
            }
            if (results.rows.length < 1) {
              return response.status(201).json({ status: 'failed', message: 'Login unsuccessful. Reason: uname incorrect.', error })
            }
    
            else if (results.rows[0].status == 'pending') {
              return response.status(201).json({ status: 'failed', message: 'Login unsuccessful. Reason: Email has not been verified.' })
            }
    
            else if (results.rows[0].uname == uname && await bcrypt.compare(password, results.rows[0].password)) {
              const token = jwt.sign({ uname: uname },
                process.env.JWT_KEY,
                {
                  expiresIn: '24h' // expires in 24 hours
                });
              return response.status(201).json({ status: 'sucess', message: 'Login successful.', token: token })
            }
            else {
              return response.status(201).json({ status: 'failed', message: 'Login unsuccessful. Reason: password incorrect.' })
            }
          })
        }
        catch (err) {
          return response.status(500).send({
            status: 'failed',
            message: 'Unforseen error occured.',
            error: err
          })
        }
        finally {
          client.release();
        }
      }


module.exports = {doLogin}