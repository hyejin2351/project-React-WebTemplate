/**
 * Created by jcdev00 on 18. 10. 8.
 */

const log = require('debug')('app:kakao');

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const UserModel = require('../../models/user');

module.exports = function (config) {
    passport.use(new KakaoStrategy({
            clientID : config.kakao.clientID,
            clientSecret: config.kakao.clientSecret, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
            callbackURL : config.kakao.callbackURL
        },
        async function(accessToken, refreshToken, profile, done){
            // 사용자의 정보는 profile에 들어있다.

            log(`accessToken ${accessToken}`);
            log(`profile ` + JSON.stringify(profile));

            const { id, displayName, _json: { properties: { profile_image } } } = profile;

            try {
                let user = await UserModel.findOne({ 'kakao.id': id });

                if(!user) {
                    // 이메일이 전달되지 않으므로 우선 'kakao.id'로 설정
                    newUser = new UserModel({
                        email: id,
                        name: displayName,
                        profileImageURL: profile_image,
                        providerType: 'kakao',
                        'kakao.id': id,
                        'kakao.accessToken': accessToken,
                        'kakao.providerData': profile
                    })

                    user = await newUser.save();
                } 

                return done(null, user);

            } catch (err) {
                console.log('Error!! trying to find user kakao')
                console.log(err)
                return done(err, false)
            }
        }
    ));
};