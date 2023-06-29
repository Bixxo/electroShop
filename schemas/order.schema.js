const Joi = require('joi');


const id = Joi.number().integer();
const userId = Joi.number().integer();
const dateCreated = Joi.date();
const expirationDate = Joi.date();
const active = Joi.boolean();
const completed = Joi.boolean();

const createOrder = Joi.object({
    id: id.required(),
    userId: userId.required(),
    dateCreated,
    expirationDate,
    active,
    completed
})

const searchOrder = Joi.object({
    id: id.required(),
})

module.exports = {
    createOrder,
    searchOrder
}