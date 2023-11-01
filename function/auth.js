// middleware/authenticate.js
const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = 'signature'; 

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err) => {
    if (err) {
      return res.status(403).json({erreur:"authentification requise mauvais token"});
    }
    next();
  });
}



module.exports = authenticate;
