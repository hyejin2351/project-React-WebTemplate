/**
 * Created by jcdev00 on 18. 10. 8.
 */

const passport = require('passport');

const UserModel = require('../models/user');
const localPassport = require('./strategies/local');
const facebookPassport = require('./strategies/facebook');
const googlePassport = require('./strategies/google');
const kakaoPassport = require('./strategies/kakao');

const config = require('../config');

module.exports = function init(server) {
    // user serialization
    passport.serializeUser(UserModel.serializeUser());
    passport.deserializeUser(UserModel.deserializeUser());

    // Serialize sessions
    // passport.serializeUser(function (user, done) {
    //     done(null, user.id);
    // });
    //
    // // Deserialize sessions
    // passport.deserializeUser(function (id, done) {
    //     UserModel.findOne({
    //         _id: id
    //     }, '-salt -password', function (err, user) {
    //         done(err, user);
    //     });
    // });

    // passport setting
    localPassport(config);
    facebookPassport(config);
    googlePassport(config);
    kakaoPassport(config);
    
    // pass the passport middleware
    server.use(passport.initialize());

    server.use(passport.session());
};
