const express = require('express');
const validorHanlder = require('../middleware/validaor.hanlder');
const { createReview } = require('../schemas/review.schema');
const ReviewService = require('../services/review.services');

const router = express.Router();
const service = new ReviewService();

/**
 * @swagger
 * /review:
 *   get:
 *     tags:
 *       - Review
 *     summary: Endpoint para consultar todas las reseñas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 *       409:
 *         description: Error en database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorDataBase'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorServer'
 */
router.get('/', async ( req, res, next ) => {
    try {
        const reviews = await service.showAllReviews();
        res.json(reviews);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /review:
 *   post:
 *     tags:
 *       - Review
 *     summary: Endpoint para crear una reseña
 *     description: Agregar una nueva reseña al ecommerce
 *     operationId: addReview
 *     requestBody:
 *       description: Elementos requeridos para crear una reseña
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *     responses:
 *       200:
 *         description: Reseña creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'          
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorBadRequest'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNotFound'
 *       409:
 *         description: Error en database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorDataBase'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorServer'
 */
router.post('/', validorHanlder(createReview, 'body'), async ( req, res, next ) => {
    const body = req.body
    try {
        const review = await service.createReview(body);
        res.json(review);
    } catch (error) {
        next(error);
    }
});













module.exports = router

