const { pool } = require('./../models/dbconnection');

class userController {
    async doLogin (request, response){
      const { uname, password } = request.body
      pool.query("SELECT * FROM auth_tab WHERE uname= $1",[uname], (error, results) => {
        if (error) {
          throw error
        }
        // console.log(results.rows[0].uname);
        // response.status(200).json(results.rows)
        if (results.rows[0].uname == uname && results.rows[0].password == password)
        {
          response.status(201).json({ status: 'sucess', message: 'Login succesfully.' })
        }
        else {
          response.status(201).json({ status: 'faild', message: 'Login unsuccesfully.' })
        }
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
