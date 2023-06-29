const express = require('express');
const passport = require('passport');
const validorHanlder = require('../middleware/validaor.hanlder');
const CategoryService = require('../services/category.services');
const { createCategory, updateCategory, searchCategory } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Endpoint para consultar todas las categorias
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Category'
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
router.get('/', async ( req, res ) => {
    const categories = await service.allCategories();
    res.json(categories);
});

router.get('/generate/:num', async ( req, res, next ) => {
    const { num } = req.params;
    try {
        const response = await service.generateCategory(num);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Endpoint para buscar una categoria por id
 *     description: Retora solo ua categoria OJO no funciona el Try in out en este componente por temas del swagger
 *     operationId: getCategoryById
 *     parameters:
 *       - in: path
 *         name: ID categoria
 *         description: ID de la categoria  a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Category'
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
router.get('/:id', validorHanlder(searchCategory, 'params'), async ( req, res, next ) => {
    const { id } = req.params
    try {
        const category = await service.findCategory(id);
        res.json(category);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Endpoint para crear una categoria
 *     description: Agregar una nueva cateogria al comerce
 *     operationId: addCategory
 *     requestBody:
 *       description: Elementos requeridos para crear una categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       200:
 *         description: Articulo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'          
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Category'
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
  *     security:
  *         - bearerAuth: []
 *       
*/
router.post('/', passport.authenticate('jwt', { session: false }),
    validorHanlder(createCategory, 'body'), async ( req, res, next ) => {
    const body = req.body
    try {
        const cateogry = await service.createCategory(body);
        res.json(cateogry);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Endpoint para eliminar una categoria por id OJO no funciona con el Try in out
 *     description: Elimina una categoria
 *     operationId: deleteCategoryById
 *     parameters:
 *       - in: path
 *         name: ID categoria
 *         description: ID de la categoria  a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      example: Confirmacion de la eliminacion
 *                 
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
router.delete('/:id', validorHanlder(searchCategory, 'params'), async ( req, res, next ) => {
    const { id } = req.params
    try {
        const category = await service.deleteCategory(id);
        res.json(category);
    } catch (error) {
        next(error)
    }
})


module.exports = router;