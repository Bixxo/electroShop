const boom = require('@hapi/boom');

function checkAdmin ( req, res, next ) {
    const user = req.user;
    if(user.admin) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

module.exports = { checkAdmin };