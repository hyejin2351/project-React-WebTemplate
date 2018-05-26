//
// debug
const d = require('debug')('app:auth');

module.exports = function init({
  AUTH_JWT_SECRET
}) {
  if (process.env.AUTH_JWT_SECRET) {
    d('use existing AUTH_JWT_SECRET');
  } else {
    process.env.AUTH_JWT_SECRET = AUTH_JWT_SECRET;
  }
};
