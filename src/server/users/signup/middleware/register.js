//
// debug
const log = require('debug')('app:register');

const JSONResponse = require('../../../../lib/JSONResponse');

function validateSignupData(data) {
  // TODO more strict validation
  let error;
  let { email, password, ...rest } = data; // eslint-disable-line prefer-const

  if (!email || !password) {
    error = 'Invalid request';
  } else {
    email = email.trim();
    password = password.trim();
    if (email.length < 1 || password.length < 1) {
      error = 'Invalid request';
    }
  }
  return new JSONResponse(!error, error, { email, password, ...rest });
}

module.exports = UserModel => (req, res, next) => {
  // login user can't register
  if (req.user) {
    log('!!! logged-in user can not register');
    return JSONResponse.sendInvalidRequest()(req, res);
  }
  // validate user data in req.body
  const resData = validateSignupData(req.body);
  if (!resData.success) {
    log('!!! Invalid user data in req.body', resData);
    return resData.send(400)(req, res);
  }

  const user = new UserModel(resData);
  return UserModel.register(new UserModel(resData), resData.password, (err) => {
    if (err) {
      log('!!! error while adding new user: ', err);
      resData.success = false;
      resData.message = 'Invalid request';
      resData.errCode = 400;
      return resData.send(400)(req, res);
    }
    // reset req body
    req.body = resData;
    return next();
  });
};
