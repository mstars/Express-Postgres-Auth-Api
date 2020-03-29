const { pool } = require('./../models/dbconnection');

class userController {
  async doLogin(request, response) {
    const { uname, password } = request.body
    const client = await pool.connect().catch(err => {
      console.log(err);
    })
    try {
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
    const client = await pool.connect().catch(err => {
      console.log(err);
    })
    try {
      client.query("INSERT INTO auth_tab (uname, password) VALUES ($1, $2)", [uname, password], error => {
        if (error) {
          // throw error
          if (error.code == '23505') {
            return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username already taken.' })
          }
          if (error.code == '23502') {
            return response.status(400).json({ status: 'failed', message: 'Registered unsuccesfully. Reason: Username can not be null.' })
          }
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
