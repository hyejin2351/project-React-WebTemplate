const d = require('debug')('app:auth');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/user');
/**
 *  The Auth Checker middleware function.
 */
module.exports = ({
  secret, credentialsRequired = false
}) => (req, res, next) => {
  d('>>>>>>>>>> validateJwtToken', req.headers.Authorization);

  if (credentialsRequired && !req.headers.Authorization) {
    return res.status(401).end();
  }

  if (!req.headers.Authorization) {
    // pass
    return next();
  } 
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.Authorization.split(' ')[1];
  d('validateJwtToken: token', token);
    
  // decode the token using a secret key-phrase
  return jwt.verify(token, secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { 
      d('validateJwtToken: invalid auth token in the request header', err);
      return res.status(401).end(); 
    }

    const userId = decoded.sub;
    d('validateJwtToken: userId', userId);

    // check if a user exists
    return UserModel.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        d('validateJwtToken: invalid auth token for user', err);
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
