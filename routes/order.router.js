const express = require('express');
const validorHanlder = require('../middleware/validaor.hanlder');
const { createOrder , searchOrder } = require('../schemas/order.schema')
const OrderServices = require('../services/order.services')

const router = express.Router();
const service = new OrderServices();

router.get('/', async ( req, res, next ) => {
    try {
        const orders = await service.getAllOrders();
        res.json(orders);
    } catch (error) {
        next(error)
    }

});

router.get('/:id', async ( req, res, next ) => {
    const { id } = req.params
    try {
        const order = await service.getOrderById(id);
        res.json(order);
    } catch (error) {
        next(error)
    }

});

router.get('/user/:id', async ( req, res, next ) => {
    const { id } = req.params
    try {
        const order = await service.getOrdersOfUser(id);
        res.json(order);
    } catch (error) {
        next(error)
    }

});

router.post('/',async ( req, res, next ) => {
    const data = req.body
    try {
        const order = await service.createOrder(data)
        res.json(order);
    } catch (error) {
        next(error)
    }
} )


module.exports = router