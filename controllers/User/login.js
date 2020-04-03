var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
require('dotenv').config()
const { pool } = require('./../../models/dbconnection');


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
            //With 2FA
            else if (results.rows[0].twofa_status == 'enabled' && results.rows[0].uname == uname && await bcrypt.compare(password, results.rows[0].password)) {
           // This is provided the by the user via form POST
            var userToken = params.get('token');

           // Load the secret.base32 from their user record in database
            var secret = results.rows[0].twofa_secret;

           // Verify that the user token matches what it should at this moment
            var verified = speakeasy.totp.verify({
              secret: secret,
              encoding: 'base32',
              token: userToken
             });
              if(verified){
              const token = jwt.sign({ uname: uname },
                process.env.JWT_KEY,
                {
                  expiresIn: '24h' // expires in 24 hours
                });
             
              return response.status(201).json({ status: 'sucess', message: 'Login successful.', token: token })
              }
              else{
                return response.status(201).json({ status: 'faild', message: 'Login unsuccessful.'})
              }
            }
            //Without 2FA
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

async function doEnableTwoFactorAuth(request, response){
  const { userid } = request.body;
  const client = await pool.connect().catch(err => {

  })
try {
  var secret = speakeasy.generateSecret({length: 20});


await client.query("update auth_tab set twofa_status=$1,twofa_secret=$2 where uid=$3", ['enabled',secret.base32,userid]).catch(err => {

  return response.status(500).send({
    status: 'failed',
    message: 'Unforseen error occured.',
    error: err
  })

})
  
  QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {

    return response.status(201).json({ status: 'sucess', message: '2FA Enabled.', image_data: image_data}) 
  });   
}


finally {
  client.release();
}

  
}

async function doDisableTwoFactorAuth(request, response){
  const { userid } = request.body;
  const client = await pool.connect().catch(err => {

  })
try {
await client.query("update auth_tab set twofa_status=$1 where uid=$2", ['disabled',userid]).catch(err => {

  return response.status(500).send({
    status: 'failed',
    message: 'Unforseen error occured.',
    error: err
  })

})
  
    return response.status(201).json({ status: 'sucess', message: '2FA Disabled.'})   
}


finally {
  client.release();
}

  
}
module.exports = {doLogin, doEnableTwoFactorAuth, doDisableTwoFactorAuth}