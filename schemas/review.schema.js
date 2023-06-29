const Joi = require('joi');

const id = Joi.number().integer();
const rating = Joi.number().integer().max(5).min(0);
const review = Joi.string();
const userId = Joi.number().integer();
const productId = Joi.number().integer();

const createReview = Joi.object({
    rating: rating.required(),
    review: review.required(),
    userId: userId.required(),
    productId: productId.required(),
});

const updateReview = Joi.object({
    review,
    rating
});

const searchReview = Joi.object({
    id: id.required()
});

module.exports = {
    createReview,
    updateReview,
    searchReview
}