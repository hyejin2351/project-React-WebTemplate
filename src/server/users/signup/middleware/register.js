//
// debug
const log = require('debug')('app:register');

const JSONResponse = require('../../../../lib/JSONResponse');
const StringLib = require('../../../../lib/stringLib');
const { PASSWORD_LENGTH, PASSWORD_ROLE: { number, lowerCase, upperCase, special }} = require('../../config');

function validateSignupData(data) {
  // TODO more strict validation
  let error;
  let { email, password, nickName, name, confirmPassword, serviceCheck, ...rest } = data; // eslint-disable-line prefer-const

  log(data);

  if (!email || !password || !nickName || !name || !confirmPassword || !serviceCheck ) {
    error = 'Invalid request';
  } else {
    email = email.trim();
    password = password.trim();
    if(!StringLib.checkEmail(email))
      error = 'Invalid email';
    else if(PASSWORD_LENGTH >  password.length)
      error = 'Password must be at least 8 characters.';
    else if (number && !StringLib.checkNumber(password))
      error = 'The minimum number should be included';
    else if (lowerCase && !StringLib.checkLowercase(password))
      error = 'The minimum lowerCase should be included';
    else if (upperCase && !StringLib.checkUppercase(password))
      error = 'The minimum upperCase should be included';
    else if (special && !StringLib.checkSpecial(password))
      error = 'The minimum special should be included';
    else if(nickName.length < 2)
      error = 'Nickname is more than 2 letters.';
    else if(name.length < 2)
      error = 'Name is more than 2 letters.';
    else if(password !== confirmPassword)
      error = 'Password and verification password are different.';
    else if(serviceCheck === 'false')
      error = 'Consent to the Terms and Conditions is required.';
  }
  return new JSONResponse(!error, error, { email, password, nickName, name, ...rest });
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
