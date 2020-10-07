const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
  try {
     
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "can't touch this" });
        } else {
          req.decodedJwt = decodedToken;
          console.log(req.decodedJwt);
          next();
        }
      })
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }

};