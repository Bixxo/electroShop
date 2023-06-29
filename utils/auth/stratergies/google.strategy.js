const { Strategy } = require('passport-google-oauth20');
const { config } = require('../../../config/config');
const UserService = require('../../../services/user.services');

const userService = new UserService();


const GoogleStrategy = new Strategy({
        clientID: config.googleId,
        clientSecret: config.googleSecret,
        // callbackURL: 'http://localhost:8080/api/v1/auth/login/google',
        callbackURL: 'https://electroshop-api.onrender.com/api/v1/auth/login/google'
    },
    async (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }
);

module.exports = GoogleStrategy;