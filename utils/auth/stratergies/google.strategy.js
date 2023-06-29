const { Strategy } = require('passport-google-oauth20');
const { config } = require('../../../config/config');
const UserService = require('../../../services/user.services');

const userService = new UserService();


const GoogleStrategy = new Strategy({
        clientID: config.googleId,
        clientSecret: config.googleSecret,
        callbackURL: 'http://localhost:8080/api/v1/auth/login/google'
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = await userService.authByGoogleId(profile.id);
        if(!user) {
            await userService.authCreateGoogleUser({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                admin: false,
                active: false,
                password: config.googlePass
            });
        }
        try {
            done(null, {status: 1, profile});
        } catch (error) {
            done(error, null);
        }
    }
);

module.exports = GoogleStrategy;