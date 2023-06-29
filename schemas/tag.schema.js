const Joi = require('joi');

const name = Joi.string();

const createTagSchema = Joi.object({
    name: name.required()
});

module.exports = {
    createTagSchema
}