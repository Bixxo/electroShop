const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createCategory = Joi.object({
    name: name.required()
});

const updateCategory = Joi.object({
    name
});

const searchCategory = Joi.object({
    id,
    name
});

module.exports = {
    createCategory,
    updateCategory,
    searchCategory
}

