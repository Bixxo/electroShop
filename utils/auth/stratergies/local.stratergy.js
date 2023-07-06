const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('../../../services/user.services');

const service = new UserService();

const LocalStratergy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
    },

    async (email, password, done ) => {
        try {
            const user = await service.findUserByEmail(email);
            if(!user) {
                done(null, {status: false, data: boom.unauthorized()});
            }
            if (!await bcrypt.compare(password, user.password)) {
                done(null, {status: false, data: boom.unauthorized()});
            }
            delete user.dataValues.password;
            done(null, { data: user})
        } catch (error) {
            done(error, false)
        }
    }
);

module.exports = LocalStratergy;