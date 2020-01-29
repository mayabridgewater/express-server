var express = require('express');
var router = express.Router();

const {getCountries, getCountryById} = require('../db/countries');

router.get('/', async function(req, res, next) {
    try {
        const results = await getCountries();
        res.send(results)
    } catch(error) {
        res.status(500).json(error)
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const country = await getCountryById(req.params.id);
        res.status(200).json(country)
    }catch (error) {
        res.status(500).json('no country')
    }
})

module.exports = router