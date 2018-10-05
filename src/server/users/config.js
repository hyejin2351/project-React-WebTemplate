exports.isDevUsers = process.env.NODE_ENV !== 'production';

exports.routePath = {
  prefix: '/api/auth',
  login: '/login',
  logout: '/logout',
  register: '/register',
  unregister: '/unregister',
  adminlogin: '/adminlogin'
};

exports.USERNAME_FIELD_NAME = 'email';
exports.PASSWORD_FIELD_NAME = 'password';
exports.SALT_LENGTH = 32;

exports.AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
exports.AUTH_SESSION_SECRET = process.env.AUTH_SESSION_SECRET;

/*
  Cryptography
  https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
*/
// TODO
// exports.passwordIterations = 10000;

// TODO: make a connection to auth database
// exports.AUTH_DB_URI = process.env.AUTH_DB_URI;
