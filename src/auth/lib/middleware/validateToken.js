const jwt = require('jsonwebtoken');

/**
 *  The Auth Checker middleware function.
 */
module.exports = UserModel => (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;

  // decode the token using a secret key-phrase
  return jwt.verify(token, AUTH_JWT_SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return UserModel.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // pass user details onto next route
      req.user = user;
      return next();
    });
  });
};

//
// using passport-jwt
// module.exports = () => passport.authenticate('jwt', { session: false })
//
