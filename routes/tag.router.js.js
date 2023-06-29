const express = require('express');
const validatorHandler = require('../middleware/validaor.hanlder');
const { createTagSchema } = require('../schemas/tag.schema');
const TagService = require('../services/tag.services');



const service = new TagService();

const router = express.Router();

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Endpoint para buscar un tag por id
 *     description: Retora solo un producto OJO no funciona el Try in out en este componente por temas del swagger
 *     operationId: getTagById
 *     parameters:
 *       - in: path
 *         name: ID tag
 *         description: ID del tag a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TagDetail'
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
router.get('/:id', async ( req, res, next ) => {
    const { id } = req.params;
    try {
        const tag = await service.findById(id);
        res.json(tag);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tag:
 *   post:
 *     tags:
 *       - Tags
 *     summary: Endpoint para crear una tag
 *     description: Agregar una nueva tag al comerce
 *     operationId: addTag
 *     requestBody:
 *       description: Elementos requeridos para crear una tag
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagCreate'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/TagCreate'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/TagCreate'
 *     responses:
 *       200:
 *         description: Articulo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'          
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorBadRequest'
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
router.post('/', validatorHandler(createTagSchema, 'body'), async ( req, res, next ) => {
    const body = req.body;
    try {
        const newTag = await service.createTag(body);
        res.json(newTag);
    } catch (error) {
        next(error)
    }
});

module.exports = router;