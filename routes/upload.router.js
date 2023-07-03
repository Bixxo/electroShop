const express = require('express');
const multerConfig = require('../middleware/uploadFile.hanlder');

const router = express.Router();

router.post('/', multerConfig.single('image'), async ( req, res, next ) => {
    try {
        res.json({status: 1, url: `https://electroshop-api.onrender.com/images/${req.file.filename}`});
    } catch (error) {
        next(error)
    }
});

module.exports = router;