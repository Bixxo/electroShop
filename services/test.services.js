const { models } = require('../libs/sequelize');

class TestService {
    constructor() {

    }

    async test() {
        const test = await models.Test.findAll();
        return test
    }
}

module.exports = TestService;