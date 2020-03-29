const { pool } = require('./../models/dbconnection');
const dotenv = require('dotenv');

dotenv.config();


/**
 * Create Auth Table if not in db.
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      auth_tab(
        uid SERIAL PRIMARY KEY,
        uname VARCHAR(25) UNIQUE NOT NULL,
        password VARCHAR(25) UNIQUE NOT NULL
      )`;

  pool.connect().then(client => {
    client.query(queryText)
      .then((res) => {
        client.release()
        if (res.rowCount != null) {
          console.log('Auth table created');
        }
      })
      .catch((err) => {
        client.release()
        console.log(err);
      });
  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  createUserTable
};

// require('make-runnable');
