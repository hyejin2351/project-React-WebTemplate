/**
 * Created by jcdev00 on 18. 10. 8.
 */
const log = require('debug')('app:google');

const passport = require('passport');
const googleStrategy   = require( 'passport-google-oauth2' ).Strategy;

const UserModel = require('../../models/user');

module.exports = function (config) {
    passport.use(new googleStrategy({
            clientID:     config.google.clientID,
            clientSecret: config.google.clientSecret,
            //NOTE :
            //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
            //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/
            //then edit your /etc/hosts local file to point on your private IP.
            //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
            //if you use it.
            callbackURL: config.google.callbackURL,
            passReqToCallback   : true,
            scope: ['https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read']
        },
        async function(request, accessToken, refreshToken, profile, done) {
            log(`accessToken ${accessToken}`);
            log(`profile ` + JSON.stringify(profile));

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            const { id, displayName, emails, photos } = profile;

            try {
                let user = await UserModel.findOne({ 'google.id': id });

                if(!user) {
                    newUser = new UserModel({
                        email: emails ? emails[0].value : undefined,
                        name: displayName,
                        profileImageURL: photos ? photos[0].value : undefined,
                        providerType: 'google',
                        'google.id': id,
                        'google.accessToken': accessToken,
                        'google.providerData': profile
                    })

                    user = await newUser.save();
                }

                return done(null, user);

            } catch (err) {
                console.log('Error!! trying to find user google')
                console.log(err)
                return done(null, false)
            }
        }
    ));
};