var express = require('express');
var router = express.Router();

const {getImages} = require('../db/images');

router.get('/:aprtId', async function(req, res, next) {
    const id = req.params.aprtId;
    console.log(id);
    // try {
    //     const images = await getImages(req.body.id)
    // }catch(error){

    // }
})

module.exports = router