var express = require('express');
var router = express.Router();

const {getImagesById, getAllImages} = require('../db/images');

router.get('/', async function(req, res, next) {
    try {
        const images = await getAllImages();
        res.status(200).json(images)
    }catch(error) {
        res.status(404).status('no images')
    }
})

router.get('/:aprtId', async function(req, res, next) {
    const id = req.params.aprtId;
    try {
        const images = await getImagesById(id);
        res.status(200).json(images)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router