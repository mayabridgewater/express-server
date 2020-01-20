var express = require('express');
var router = express.Router();

const {getImages} = require('../db/images');

router.get('/:aprtId', async function(req, res, next) {
    const id = req.params.aprtId;
    try {
        const images = await getImages(id);
        res.status(200).json(images)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router