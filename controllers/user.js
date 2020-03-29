var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

require('dotenv').config()
const { pool } = require('./../models/dbconnection');

const saltRounds = 10;

class userController {
  async doLogin(request, response) {
    const { uname, password } = request.body
    const client = await pool.connect().catch(err => {
      console.log(err);
    })

var email = 'linto@netobjex.com';
// Create a verification token for this user
var token = crypto.randomBytes(16).toString('hex');

// Save the verification token
token.save(function (err) {
 if (err) { return res.status(500).send({ msg: err.message }); }

    // Send the email
  var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
    var mailOptions = {
      from: 'no-reply@demo.com',
      to: email,
      subject: 'Account Verification Token',
      text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost' + '\/confirmation\/' + token + '.\n'
    };
    transporter.sendMail(mailOptions, function (err) {
        if (err) { return err.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + email + '.');
        console.log("Sucess");
    });
});

    try {
      client.query("SELECT * FROM auth_tab WHERE uname= $1", [uname], async (error, results) => {
        if (error) {
          return response.status(201).json({ status: 'failed', message: 'Login unsuccessful.', error })
        }
        if (results.rows.length < 1) {
          return response.status(201).json({ status: 'failed', message: 'Login unsuccessful. Reason: uname incorrect.', error })
        }
        else if (results.rows[0].status = 'pending') {
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

  async doCreateAccount(request, response) {
    const { uname, email, password } = request.body;

    const client = await pool.connect().catch(err => {
      console.log(err);
    })
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds).catch(err => {
        console.log(err);
      })
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;

      const userSave = await client.query("INSERT INTO auth_tab (uname, email, password, status, created ) VALUES ($1, $2, $3, $4, $5 )", [uname, email, hashedPassword, 'pending', dateTime]).catch(err => {
        if (error) {
          // throw error
          if (error.code == '23505') {
            return response.status(500).json({ status: 'failed', message: 'Registration Failed. Reason: Username already taken.' })
          }
          if (error.code == '23502') {
            return response.status(500).json({ status: 'failed', message: 'Registration Failed. Reason: Username can not be null.' })
          }
          console.log(error);
          return response.status(201).json({ status: 'failed', message: 'Registration Failed.', error })
        }
      })
      if (userSave.rowCount != 0) {
        const fetchUid = await client.query("SELECT uid from auth_tab where uname= $1", [uname]).catch(err => {
          console.log(err);
        })
        // Create a verification token for this user
        var token = crypto.randomBytes(16).toString('hex');
        // Save the verification token
        const saveToken = await client.query("INSERT INTO tokens_tab (verifyToken, userId, created ) VALUES ($1, $2, $3)", [token, fetchUid.rows[0].uid, dateTime]).catch(err => {
          return response.status(500).send({ msg: err.message });
        });
        // Send the email
        if (saveToken.rowCount != 0) {
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
          var mailOptions = { from: 'no-reply@demo.com', to: email, subject: 'Account Verification Token', text: 'Hello,\n\n Please verify your account by clicking the link: \nhttp:\/\/' + request.headers.host + '\/confirmation\/' + token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
            if (err) { return response.status(500).send({ msg: err.message }); }
            return response.status(200).send('A verification email has been sent to ' + email + '.');
          });
        }
        else {
          return response.status(500).send({
            status: 'failed',
            message: 'Unforseen error occured.'
          })
        }

      }
      else {
        return response.status(500).send({
          status: 'failed',
          message: 'Unforseen error occured.'
        })
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


module.exports = new userController
