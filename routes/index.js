const express = require('express');
const testRouter = require('./test.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const userRouter = require('./user.router')
const reviewRouter = require('./review.router');
const authRouter = require('./auth.router');
const tagRouter = require('./tag.router.js');
const orderRouter = require('./order.router')
const paymentRouter = require('./payment.router')

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Gorgeous Cotton Pizza
 *         description:
 *           type: string
 *           example: The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design
 *         image:
 *           type: string
 *           format: uri
 *           example: https://loremflickr.com/640/480/cats
 *         stock:
 *           type: integer
 *           example: 0
 *         price:
 *           type: string
 *           example: "907.00"
 *         review:
 *           type: string
 *           example: null / 3.9
 *         category:
 *           $ref: '#/components/schemas/Category'
 * 
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Gorgeous Cotton Pizza
 *         description:
 *           type: string
 *           example: The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design
 *         image:
 *           type: string
 *           format: uri
 *           example: https://loremflickr.com/640/480/cats
 *         stock:
 *           type: integer
 *           example: 0
 *         price:
 *           type: string
 *           example: "907.00"
 *         review:
 *           type: string
 *           example: null / 3.9
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         reviews:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  rating:
 *                      type: integer
 *                      example: 4
 *                  review:
 *                      type: string
 *                      example: Descripcion de la reseña
 *                  user:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 5
 *                          name:
 *                              type: string
 *                              example: Juanitokun
 *              
 * 
 *     ProductResponseCreate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Gorgeous Cotton Pizza
 *         description:
 *           type: string
 *           example: The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design
 *         image:
 *           type: string
 *           format: uri
 *           example: https://loremflickr.com/640/480/cats
 *         stock:
 *           type: integer
 *           example: 0
 *         price:
 *           type: string
 *           example: "907.00"
 *         review:
 *           type: null
 *           example: null
 *         categoryId:
 *           type: integer
 *           example: 6
 * 
 *     ProductCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Gorgeous Cotton Pizza
 *         description:
 *           type: string
 *           example: The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design
 *         image:
 *           type: string
 *           format: uri
 *           example: https://loremflickr.com/640/480/cats
 *         stock:
 *           type: integer
 *           example: 0
 *         price:
 *           type: string
 *           example: "907.00"
 *         categoryId:
 *           type: integer
 *           example: 6
 * 
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: electronica
 * 
 *     CategoryCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: electronica
 * 
 *     AuthLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: juanito@mail.com
 *         password:
 *           type: string
 *           example: admin123
 * 
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: RGB
 * 
 *     TagCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: RGB
 * 
 *     TagDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: RGB
 *         products:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 3
 *                  name:
 *                      type: string
 *                      example: RTX 3080
 *                  description:
 *                      type: string
 *                      example: description product
 *                  image:
 *                      type: string
 *                      example: https://image.com
 *                  stock:
 *                      type: integer
 *                      example: 6
 *                  price:
 *                      type: integer
 *                      example: 699.99
 *                  categoryId:
 *                      type: integer
 *                      example: 1
 *                  review:
 *                      type: string
 *                      example: null/2.5
 * 
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         rating:
 *           type: integer
 *           example: 4
 *         review:
 *           type: string
 *           example: Descripcion de la reseña
 *         userId:
 *           type: integer
 *           example: 4
 *         productId:
 *           type: integer
 *           example: 8
 * 
 *     ReviewCreate:
 *       type: object
 *       properties:
 *         rating:
 *           type: integer
 *           example: 4
 *         review:
 *           type: string
 *           example: Descripcion de la reseña
 *         userId:
 *           type: integer
 *           example: 4
 *         productId:
 *           type: integer
 *           example: 8
 * 
 *     Users:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dni:
 *           type: integer
 *           example: 1525698
 *         name:
 *           type: string
 *           example: Juan
 *         username:
 *           type: string
 *           example: Juanitokun19
 *         email:
 *           type: string
 *           example: juanito@mail.com
 *         birthDate:
 *           type: date
 *           example: 01/01/1900
 *         adress:
 *           type: string
 *           example: Mi casa
 *         city:
 *           type: string
 *           example: Mi ciudad
 *         phoneNumber:
 *           type: integer
 *           example: 123456
 *         admin:
 *           type: boolean
 *           example: false
 *         active:
 *           type: boolean
 *           example: true
 * 
 *     UsersUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dni:
 *           type: integer
 *           example: 1525698
 *         name:
 *           type: string
 *           example: Juan
 *         username:
 *           type: string
 *           example: Juanitokun19
 *         email:
 *           type: string
 *           example: juanito@mail.com
 *         password:
 *           type: string
 *           example: admin123
 *         birthDate:
 *           type: date
 *           example: 01/01/1900
 *         adress:
 *           type: string
 *           example: Mi casa
 *         city:
 *           type: string
 *           example: Mi ciudad
 *         phoneNumber:
 *           type: integer
 *           example: 123456
 *         admin:
 *           type: boolean
 *           example: false
 *         active:
 *           type: boolean
 *           example: true
 * 
 *     UsersCreate:
 *       type: object
 *       properties:
 *         dni:
 *           type: integer
 *           example: 1525698
 *         name:
 *           type: string
 *           example: Juan
 *         username:
 *           type: string
 *           example: Juanitokun19
 *         email:
 *           type: string
 *           example: juanito@mail.com
 *         password:
 *           type: string
 *           example: admin123
 *         birthDate:
 *           type: date
 *           example: 01/01/1900
 *         adress:
 *           type: string
 *           example: Mi casa
 *         city:
 *           type: string
 *           example: Mi ciudad
 *         phoneNumber:
 *           type: integer
 *           example: 123456
 * 
 *     ErrorBadRequest:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *         error:
 *           type: string
 *           example: Bad Request
 *         message:
 *           type: string
 *           example: Mensaje de del error
 * 
 *     ErrorNotFound:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 404
 *         error:
 *           type: string
 *           example: Not Found
 *         message:
 *           type: string
 *           example: Mensaje de del error
 * 
 *     ErrorUnauthorized:
 *       type: object
 *       properties:
 *         statsu:
 *          type: boolean
 *          example: false
 *         data:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 401
 *              error:
 *                  type: string
 *                  example: Unauthorized
 *              message:
 *                  type: string
 *                  example: Mensaje de del error
 * 
 *     ErrorDataBase:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 409
 *         error:
 *           type: string
 *           example: Error en la base de datos
 *         errors:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  data:
 *                      type: string
 *                      example: Toda la info sobre el error
 *              
 * 
 *     ErrorServer:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 500
 *         error:
 *           type: string
 *           example: Error intero del servidor
 *         message:
 *           type: string
 *           example: Favor de buscar al equipo de Backend :(
 *         data:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  example: mensaje del error
 *              stack:
 *                  type: string
 *                  example: info de ubiacion donde esta sucediendo el error
 * 
 */
const routerApi = app => {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/test', testRouter);
    router.use('/category', categoryRouter);
    router.use('/product', productRouter);
    router.use('/user',userRouter)
    router.use('/review', reviewRouter);
    router.use('/auth', authRouter);
    router.use('/tag', tagRouter);
    router.use('/order', orderRouter)
    router.use('/payment', paymentRouter)
}

module.exports = routerApi;