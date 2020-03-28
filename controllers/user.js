const { pool } = require('./../models/dbconnection');

class userController {
    async doLogin (request, response){
      const { uname, password } = request.body
      pool.query("SELECT * FROM auth_tab WHERE uname= $1",[uname], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
        response.status(201).json({ status: 'success', message: 'Login succesfull.' })
      })
    }

    async doCreateAccount (request, response){
      const { uname, password } = request.body
      console.log(uname);
      pool.query("INSERT INTO auth_tab (uname, password) VALUES ($1, $2)", [uname, password], error => {
        if (error) {
          // throw error
          response.status(201).json({ status: 'faield', message: 'Registered unsuccesfully.' })
        }
        response.status(201).json({ status: 'success', message: 'Registered succesfully.' })
      })
    }
}


module.exports = new userController
