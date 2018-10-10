/**
 * Created by jcdev00 on 18. 10. 8.
 */

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const UserModel = require('../../models/user');

module.exports = function (config) {
    passport.use(new LocalStrategy({
            usernameField: config.USERNAME_FIELD_NAME,
            passwordField: config.PASSWORD_FIELD_NAME,
            session: true
        },
        UserModel.authenticate())
    );
};

