const express = require('express');
const router = express.Router();

const {getAptHistory} = require('../db/history');

router.get('/apartment/:apartmentId', async function(req, res, next) {
    try {
        const history = await getAptHistory(req.params.apartmentId);
        res.status(200).json(history)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router