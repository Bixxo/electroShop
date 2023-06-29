const express = require('express');
const router = express.Router();

const PaymentController = require('../utils/paymentController/paymentController')
const PaymentService = require ('../services/payment.services')
const PaymentInatance = new PaymentController(new PaymentService())

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
    // res.render('index', { title: 'Express' });
        res.send('Hola')
    } catch (error) {
    next(error)
    }
});

router.post('/', async function(req, res, next) {
    try {
        PaymentInatance.getPaymentLink(req, res);
    } catch (error) {
        next(error)
    }
    
});

module.exports = router;
