const express = require('express');
const validorHanlder = require('../middleware/validaor.hanlder');
const ProductService = require('../services/product.services');
const { createProduct, searchProduct, addTags } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Endpoint para consultar todos los articulos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
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
        const products = await service.findAllProducts();
        res.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/order/price', async ( req, res, next ) => {
    const { min, max } = req.query;
    try {
        const products = await service.orderByPrice(min, max);
        res.json(products)
    } catch (error) {
        next(error)
    }
});

router.get('/order/category/:id', async ( req, res, next ) => {
    const { id } = req.params;
    try {
        const products = await service.orderByCategory(id);
        res.json(products );
    } catch (error) {
        next(error);
    }
});

router.get('/order/reviews', async ( req, res, next ) => {
    try {
        const products = await service.orderByReviews();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/order/sold', async ( req, res, next ) => {
    try {
        const products = await service.orderBySold();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /product/find/{name}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Endpoint para buscar productos que coincidan por un nombre
 *     description: Retorna un array de productos
 *     operationId: getProductByName
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Nombre del producto a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
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
router.get('/find/:name', validorHanlder(searchProduct, 'params'), async ( req, res, next ) => {
    const { name } = req.params;
    try {
        const product = await service.findByName(name);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Endpoint para buscar un producto por id
 *     description: Retora solo un producto OJO no funciona el Try in out en este componente por temas del swagger
 *     operationId: getProductById
 *     parameters:
 *       - in: path
 *         name: ID producto
 *         description: ID del producto a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/ProductDetail'
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
router.get('/:id', validorHanlder(searchProduct, 'params'), async ( req, res, next ) => {
    const { id } = req.params;
    try {
        const product = await service.findById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Endpoint para crear un producto
 *     description: Agregar un nuevo producto al ecomerce
 *     operationId: addProduct
 *     requestBody:
 *       description: Elementos requeridos para crear un producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: Articulo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponseCreate'          
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponseCreate'
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
router.post('/', validorHanlder(createProduct, 'body'), async ( req, res, next ) => {
    const body = req.body
    try {
        const product = await service.createProduct(body);
        res.json(product);
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /product/add-tag:
 *   post:
 *     tags:
 *       - Products
 *     summary: Endpoint para crear una tag en productos
 *     description: Agregar una tag a un producto
 *     operationId: addProductTag
 *     requestBody:
 *       description: Elementos requeridos para crear un producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  productId:
 *                      type: integer
 *                      example: 3
 *                  tagId:
 *                      type: integer
 *                      example: 2
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *                  productId:
 *                      type: integer
 *                      example: 3
 *                  tagId:
 *                      type: integer
 *                      example: 2
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *                  productId:
 *                      type: integer
 *                      example: 3
 *                  tagId:
 *                      type: integer
 *                      example: 2
 *     responses:
 *       200:
 *         description: Articulo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  productId:
 *                      type: integer
 *                      example: 3
 *                  tagId:
 *                      type: integer
 *                      example: 2        
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  productId:
 *                      type: integer
 *                      example: 3
 *                  tagId:
 *                      type: integer
 *                      example: 2      
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
router.post('/add-tag', validorHanlder(addTags, 'body'), async ( req, res, next ) => {
    const body = req.body
    try {
        const newTag = await service.addTag(body);
        res.json(newTag);
    } catch (error) {
        next(error)
    }
})

router.get('/generate/:num', async ( req, res, next ) => {
    const { num } = req.params;
    try {
        const generate = await service.generateProducts(num);
        res.json(generate);
    } catch (error) {
        console.log('entra');
        next(error);
    }
});


module.exports = router