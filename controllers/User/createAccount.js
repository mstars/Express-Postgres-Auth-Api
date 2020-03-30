var bcrypt = require('bcrypt');
var crypto = require('crypto');
require('dotenv').config();

const saltRounds = 10;

const { pool } = require('./../../models/dbconnection');
const mailer = require('./../mailer/mailer');

class createAccount{
    async doCreateAccount(request, response) {
        const { uname, email, password } = request.body;
    
        const client = await pool.connect().catch(err => {
        })
        try {
          const hashedPassword = await bcrypt.hash(password, saltRounds).catch(err => {
          })
          var today = new Date();
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date + ' ' + time;
    
          const userSave = await client.query("INSERT INTO auth_tab (uname, email, password, status, created ) VALUES ($1, $2, $3, $4, $5 )", [uname, email, hashedPassword, 'pending', dateTime]).catch(error => {
            if (error) {
              // console.log(error);
              if (error.code == '23505' && error.constraint == 'auth_tab_email_key') {
                return response.status(500).json({ status: 'failed', message: 'Registration Failed. Reason: Email already exist' })
              }
              if (error.code == '23505' && error.constraint == 'auth_tab_uname_key') {
                return response.status(500).json({ status: 'failed', message: 'Registration Failed. Reason: uname already exist' })
              }
              if (error.code == '23502') {
                return response.status(500).json({ status: 'failed', message: 'Registration Failed. Reason: Username can not be null.' })
              }
              return response.status(201).json({ status: 'failed', message: 'Registration Failed.', error })
            }
          })
          if (userSave.rowCount != 0 && userSave.rowCount != undefined && userSave.rowCount != null) {
            const fetchUid = await client.query("SELECT uid from auth_tab where uname= $1", [uname]).catch(err => {
    
            })
            // Create a verification token for this user
            var token = crypto.randomBytes(16).toString('hex');
            // Save the verification token
            const saveToken = await client.query("INSERT INTO tokens_tab (verifyToken, userId, created ) VALUES ($1, $2, $3)", [token, fetchUid.rows[0].uid, dateTime]).catch(err => {
              return response.status(500).send({ msg: err.message });
            });
            // Send the email
            if (saveToken.rowCount != 0 && saveToken.rowCount != undefined && saveToken.rowCount != null) {
              const mailSent = await mailer.sendMail(email, token).catch(err => {
                return response.status(500).send({ message: err.message })
              });
              if (mailSent) {
                return response.status(200).send({ message: mailSent.message });
              }
            }
    
          }
    
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
    
}

module.exports = new createAccount