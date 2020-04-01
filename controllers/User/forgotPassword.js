const crypto = require('crypto');
const { pool } = require('./../../models/dbconnection');
const mailer = require('../mailer/mailer');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

async function doForgotPassword(request, response) {
  const { email } = request.body;
  const client = await pool.connect().catch(err => {
  })
  try {

    const fetchUid = await client.query("SELECT uid from auth_tab where email= $1", [email]).catch(err => {
     

    })
    if (fetchUid.rowCount > 0 && fetchUid.rowCount != undefined && fetchUid.rowCount != null) {
      // Create a verification token for this user
      var token = crypto.randomBytes(16).toString('hex');
    
      // Save the verification token
      const saveToken = await client.query("INSERT INTO tokens_tab (verifyToken, userId, created ) VALUES ($1, $2, $3)", [token, fetchUid.rows[0].uid, dateTime]).catch(err => {
     
        return response.status(500).send({ msg: err.message });
      });
      // Send the email
      if (saveToken.rowCount > 0 && saveToken.rowCount != undefined && saveToken.rowCount != null) {
        const mailSent = await mailer.sendMail(email, token, 'forgot').catch(err => {
         
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

async function renderResetPassword(request, response) {
  const token = request.query.token;
  const client = await pool.connect().catch(err => {
  })
  try {
    const fetchToken = await client.query("SELECT * FROM tokens_tab WHERE verifyToken=$1", [token]).catch(err => {
     
      return response.render("response", { status: false, message: 'Invalid token' });
    })
    if (fetchToken.rowCount > 0 && fetchToken.rowCount != undefined && fetchToken.rowCount != null) {
      return response.render("changepassword", { userid: fetchToken.rows[0].userid, token })
    }
    else if (fetchToken.rowCount == 0) {
      return response.render("response", { status: false, message: 'Invalid token' });
    }
  } catch (err) {
    
    return response.render("response", {
      status: false,
      message: 'Unforseen error occured.'
    })
  }
  finally {
    client.release();
  }
}

async function resetPassword(request, response) {
  const { userid, token, password, confirmpassword } = request.body;
  
  const client = await pool.connect().catch(err => {
  })
  try {
    if (password == confirmpassword) {
      const hashedPassword = await bcrypt.hash(password, saltRounds).catch(err => {
        
      });
      const updatePassword = await client.query("update auth_tab set password=$1 where uid=$2", [hashedPassword,userid]).catch(err => {
       
        return response.status(400).send({
          status: false,
          message: 'Unforseen error occured.',
          error: err
        })
      })

      if (updatePassword.rowCount > 0 && updatePassword.rowCount != undefined && updatePassword.rowCount != null) {
        const updateToken = await client.query("DELETE FROM tokens_tab where verifyToken=$1", [token]).catch(err => {
          
        })
        if (updateToken.rowCount > 0 && updateToken.rowCount != undefined && updateToken.rowCount != null) {
          return response.status(200).send({ status: true, message: 'Password reset successful.' })
        }
        else if (updateToken.rowCount == 0) {
          return response.status(400).send({ status: false, message: 'Unable to update password.' });
        }
      }
    }
    else {
      return response.status(400).send({ status: false, message: 'Passwords donot match' });
    }
  } catch (err) {
  
    return response.status(400).send({
      status: false,
      message: 'Unforseen error occured.',
      error: err
    })
  }
  finally {
    client.release();
  }
}


module.exports = { doForgotPassword, renderResetPassword, resetPassword }