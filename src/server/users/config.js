exports.dev = process.env.NODE_ENV !== 'production';

exports.routePath = {
  prefix: '/api/auth',
  login: '/login',
  logout: '/logout',
  register: '/register',
  unregister: '/unregister'
};

exports.usernameField = 'email';
exports.passwordField = 'password';
exports.saltlen = 32;

exports.AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
