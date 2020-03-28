const { pool } = require('./../models/dbconnection');

class userController {
  constructor() {
    const view = (request, response) => {
      pool.query('SELECT * FROM auth_tab', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    const createAccount = (request, response) => {
      const { author, title } = request.body

      pool.query('INSERT INTO auth_tab (uname, password) VALUES ($1, $2)', [uname, password], error => {
        if (error) {
          throw error
        }
        response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
      })
    }
  }
}


module.exports = { userController }
