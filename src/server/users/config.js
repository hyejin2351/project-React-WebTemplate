exports.isDevUsers = process.env.NODE_ENV !== 'production';

exports.routePath = {
    prefix: '/api/auth',
    login: '/login',
    logout: '/logout',
    register: '/register',
    unregister: '/unregister',
    adminlogin: '/adminlogin',
    strategy: '/:strategy',
    facebookCallback: '/facebook/callback',
    googleCallback: '/google/callback',
    kakaoCallback: '/kakao/callback'
};

exports.USERNAME_FIELD_NAME = 'email';
exports.PASSWORD_FIELD_NAME = 'password';
exports.SALT_LENGTH = 32;

exports.AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
exports.AUTH_SESSION_SECRET = process.env.AUTH_SESSION_SECRET;

exports.facebook = {
    clientID: process.env.FACEBOOK_ID || '255589955299060',
    clientSecret: process.env.FACEBOOK_SECRET || '3b4e8ffd0d5357e5acb8f4f66d1c9d76',
    callbackURL: '/api/auth/facebook/callback'
}

exports.google = {
    clientID: process.env.GOOGLE_ID || '538037402069-l0pv7q0khdnm0batsp9erkln4kqsje1q.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'NkmJZZApdKU2M0bfCetUxRU0',
    callbackURL: '/api/auth/google/callback'
}

exports.kakao = {
    clientID: process.env.KAKAO_KEY || '7c719588152a495290b3d96ed5800088',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: '/api/auth/kakao/callback'
}

/*
 Cryptography
 https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
 */
// TODO
// exports.passwordIterations = 10000;

// TODO: make a connection to auth database
// exports.AUTH_DB_URI = process.env.AUTH_DB_URI;
