const { pool } = require('./../models/dbconnection');

class userController {
  async doLogin(request, response) {
    const { uname, password } = request.body
    try {
      pool.query("SELECT * FROM auth_tab WHERE uname= $1", [uname], (error, results) => {
        if (error) {
          response.status(201).json({ status: 'failed', message: 'Login unsuccesful.', error })
        }
        if (results.rows[0].uname == uname && results.rows[0].password == password) {
          response.status(201).json({ status: 'sucess', message: 'Login succesfully.' })
        }
        else {
          response.status(201).json({ status: 'failed', message: 'Login unsuccesfully.' })
        }
      })
    }
    catch (err) {
      response.status(400).send({
        status: 'failed',
        message: 'Unforseen error occured.',
        error: err
      })
    }
  }

  async doCreateAccount(request, response) {
    const { uname, password } = request.body
    try {
      pool.query("INSERT INTO auth_tab (uname, password) VALUES ($1, $2)", [uname, password], error => {
        if (error) {
          // throw error
          response.status(201).json({ status: 'failed', message: 'Registered unsuccesfully.' })
        }
        response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
      })
    }
    catch (err) {
      response.status(400).send({
        status: 'failed',
        message: 'Unforseen error occured.',
        error: err
      })
    }
  }
}


module.exports = new userController
