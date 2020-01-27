var express = require('express');
var router = express.Router();

const {getCityByCountry, getCityById} = require('../db/cities');

router.get('/:country_id', async function(req, res, next) {
    const country_id = req.params.country_id;
    try {
        const cities = await getCityByCountry(country_id);
        res.send(cities)
    } catch(error) {
        res.status(500).json(error)
    }

});

router.get('/', async function(req, res, next) {
    try {
        const city = await getCityById(req.query.city_id);
        res.status(200).json(city)
    }catch(error) {
        res.status(200).json('no city')
    } 
})

module.exports = router