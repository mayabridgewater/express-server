var express = require('express');
var router = express.Router();

const {getCityByCountry} = require('../db/cities');

router.get('/:country_id', async function(req, res, next) {
    const country_id = req.params.country_id;
    try {
        const cities = await getCityByCountry(country_id);
        res.send(cities)
    } catch(error) {
        res.status(500).json(error)
    }

});

module.exports = router