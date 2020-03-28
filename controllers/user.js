const { pool } = require('./../models/dbconnection');

class userController {
    async doLogin (request, response){
      pool.query('SELECT * FROM auth_tab', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    async doCreateAccount (request, response){
      const { uname, password } = request.body
      pool.query('INSERT INTO auth_tab (uname, password) VALUES ($1, $2)', [uname, password], error => {
        if (error) {
          throw error
        }
        response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
      })
    }
}


module.exports = new userController
