//
// debug
const d = require('debug')('app:auth');

// const {
//   usernameField, passwordField
// } = require('../../config');

function validateUserData({
  email, password, name
}) {
  if (!email || !password) return null;

  email = email.trim();
  password = password.trim();

  // more... validation

  return {
    email,
    password,
  };
}

module.exports = UserModel => (req, res, next) => {
  // login user can't register
  if (req.headers.Authorization) {
    d('!!! login user can not register');
    return res.status(400).end();
  }
  // validate user data in req.body
  const userData = validateUserData(req.body);
  if (!userData) {
    d('!!! Invalid user data in req.body', req.body);
    return res.status(400).end();
  }

  const user = new UserModel(userData);
  return UserModel.register(new UserModel(userData), userData.password, (err) => {
    if (err) {
      d('!!! error while adding new user: ', err);
      return res.status(400).end();
    }
    return next();
  });
};
