/**
 * Created by jcdev00 on 18. 10. 8.
 */

const log = require('debug')('app:facebook');

var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;

const UserModel = require('../../models/user');

module.exports = function (config) {
    passport.use(new facebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
        },
        async function (accessToken, refreshToken, profile, done) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            log(`accessToken ${accessToken}`);
            log(`profile ` + JSON.stringify(profile));

            const { id, displayName, emails, photos } = profile;

            try {
                let user = await UserModel.findOne({ 'facebook.id': id });

                if(!user) {
                    // web-prototype 앱을 공개 설정까지는 email 정보가 전달되지 않으므로 우선 'facebook.id'로 설정
                    newUser = new UserModel({
                        email: emails ? emails[0].value : id,
                        name: displayName,
                        profileImageURL: photos ? photos[0].value : undefined,
                        providerType: 'facebook',
                        'facebook.id': id,
                        'facebook.accessToken': accessToken,
                        'facebook.providerData': profile
                    })

                    user = await newUser.save();
                }

                return done(null, user);

            } catch (err) {
                console.log('Error!! trying to find user facebook')
                console.log(err)
                return done(null, false)
            }
        }));
};