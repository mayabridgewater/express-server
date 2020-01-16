var express = require('express');
var router = express.Router();

const {getCountries} = require('../db/countries');

router.get('/', async function(req, res, next) {
    try {
        const results = await getCountries();
        res.send(results)
    } catch(error) {
        res.status(400).json(error)
    }
});

module.exports = router