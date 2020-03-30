const crypto = require('crypto');
const { pool } = require('./../../models/dbconnection');
const mailer = require('../mailer/mailer');
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
async function doForgotPassword(request, response) {
  const { email } = request.body;
  console.log(email);
  const client = await pool.connect().catch(err => {
  })
  try {

    const fetchUid = await client.query("SELECT uid from auth_tab where email= $1", [email]).catch(err => {
      console.log(err);

    })
    if (fetchUid.rowCount != 0 && fetchUid.rowCount != undefined && fetchUid.rowCount != null) {
      // Create a verification token for this user
      var token = crypto.randomBytes(16).toString('hex');
      // Save the verification token
      const saveToken = await client.query("INSERT INTO tokens_tab (verifyToken, userId, created ) VALUES ($1, $2, $3)", [token, fetchUid.rows[0].uid, dateTime]).catch(err => {
        console.log(err);
        return response.status(500).send({ msg: err.message });
      });
      // Send the email
      if (saveToken.rowCount != 0 && saveToken.rowCount != undefined && saveToken.rowCount != null) {
        const mailSent = await mailer.sendMail(email, token, 'forgot').catch(err => {
          console.log(err);
          return response.status(500).send({ message: err.message })
        });
        if (mailSent) {
          return response.status(200).send({ message: mailSent.message });
        }
      }

    }
    else {
      return response.status(201).json({ status: 'failed', message: 'Email does not exist.' })
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


module.exports = { doForgotPassword }