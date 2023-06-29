const express = require('express');
const Test = require('../services/test.services');


const service = new Test();

const router = express.Router();

router.get('/', async ( req, res ) => {
    const  test = await service.test();
    res.json(test)
});

module.exports = router;