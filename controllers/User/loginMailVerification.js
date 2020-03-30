require('dotenv').config()
const { pool } = require('./../../models/dbconnection');

class loginMailVerification{

    async verifyToken(request, response) {
        const token = request.query.token;
        const client = await pool.connect().catch(err => {
        })
        try {
          client.query("SELECT * FROM tokens_tab WHERE verifytoken= $1", [token], async (error, results) => {
            if(error){
              return response.status(400).json({ status: 'failed', message: 'Unable to verify your account.' })
            }
            if (results.rows.length < 1) {
              return response.status(400).json({ status: 'failed', message: 'Account verification failed. Reason: Invalid token.' });
            }
            else {
              const updateStatus = await client.query("UPDATE auth_tab SET status= $1 WHERE uid =$2", ['active', results.rows[0].userid]).catch(err => {
                console.log(err);
              })
              if (updateStatus.rowCount != 0 && updateStatus.rowCount != undefined && updateStatus.rowCount != null) {
                const updateToken = await client.query("DELETE FROM tokens_tab WHERE verifytoken =$1", [token]).catch(err => {
                  console.log(err);
                });
                if(updateToken.rowCount != 0 && updateToken.rowCount != undefined && updateToken.rowCount != null){
                  return response.status(201).json({ status: 'sucess', message: 'Account verified.', token: token });
                }
              }
              else {
                return response.status(400).json({ status: 'failed', message: 'Unable to verify your account.' });
              }
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
}

module.exports = new loginMailVerification