const Joi = require('joi');

const id = Joi.number().integer();
const dni = Joi.number().integer();
const name = Joi.string();
const username = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const birthDate = Joi.date();
const adress = Joi.string();
const city = Joi.string();
const phoneNumber = Joi.number().integer().min(0);
const admin = Joi.boolean();
const active = Joi.boolean();

const createUser = Joi.object({
    dni: dni.required(),
    name: name.required(),
    username: username.required(),
    email: email.required(),
    password: password.required(),
    birthDate: birthDate.required(),
    adress: adress.required(),
    city: city.required(),
    phoneNumber: phoneNumber.required(),
});

const updateUser = Joi.object({
    id : id.required(),
    name,
    password,
    adress,
    city,
    phoneNumber,
    admin,
    active
});

const searchUser = Joi.object({
    id,
    email,
    phoneNumber,
});

module.exports = {
    createUser,
    updateUser,
    searchUser
}