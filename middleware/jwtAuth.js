const jwt = require('jsonwebtoken');
require('dotenv').config()

async function checkToken (req, res, next)  {
  const token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token_c = token.slice(7, token.length);
  }

  if (token_c) {
    jwt.verify(token_c, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
checkToken
}
