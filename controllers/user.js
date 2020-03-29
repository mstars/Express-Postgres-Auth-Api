const { pool } = require('./../models/dbconnection');

class userController {
  async doLogin(request, response) {
    const { uname, password } = request.body
    try {
      pool.connect().then(client => {
        client.query("SELECT * FROM auth_tab WHERE uname= $1", [uname], (error, results) => {
          if (error) {
            client.release();
            return response.status(201).json({ status: 'failed', message: 'Login unsuccesful.', error })
          }
          if (results.rows[0].uname == uname && results.rows[0].password == password) {
            client.release();
            return response.status(201).json({ status: 'sucess', message: 'Login succesfully.' })
          }
          else {
            client.release();
            return response.status(201).json({ status: 'failed', message: 'Login unsuccesfully.' })
          }
        })
      }).catch(err=>{
        console.log(err);
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
    const { uname, password } = request.body
    try {
      pool.connect().then(client => {
        client.query("INSERT INTO auth_tab (uname, password) VALUES ($1, $2)", [uname, password], error => {
          if (error) {
            // throw error
            if (error.code == '23505') {
              client.release();
              return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username already taken.' })
            }
            if (error.code == '23502') {
              client.release();
              return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username can not be null.' })
            }
            client.release();
            return response.status(201).json({ status: 'failed', message: 'Registered unsuccesfully.', error })
          }
          client.release();
          return response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
        })
      }).catch(err=>{
        console.log(err);
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
