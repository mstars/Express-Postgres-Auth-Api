const { pool } = require('./../models/dbconnection');
const dotenv = require('dotenv');

dotenv.config();


/**
 * Create Auth Table if not in db.
 */
async function createUserTable() {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      auth_tab(
        uid SERIAL PRIMARY KEY,
        uname VARCHAR(25) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) UNIQUE NOT NULL,
        status VARCHAR(25) NOT NULL,
        twofa_status VARCHAR(25) NOT NULL,
        twofa_secret VARCHAR(100) NOT NULL,
        twofa_token VARCHAR(40),
        created TIMESTAMP DEFAULT NULL
      )`;

  const client = await pool.connect().catch(err => {
    console.log(err);
  });
  client.query(queryText)
    .then((res) => {
      console.log('Auth table created');
    })
    .catch((err) => {
      console.log("This" + err);
    });
  client.release();
}

async function createTokenTable() {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      tokens_tab(
        tid SERIAL PRIMARY KEY,
        verifyToken VARCHAR(40) UNIQUE NOT NULL,
        userId INTEGER REFERENCES auth_tab(uid),
        created TIMESTAMP DEFAULT NULL
      )`;

  const client = await pool.connect().catch(err => {
    console.log(err);
  });
  client.query(queryText)
    .then((res) => {
      console.log('Tokens table created');
    })
    .catch((err) => {
      console.log(err);
    });
  client.release();
}
module.exports = {
  createUserTable,
  createTokenTable
};
