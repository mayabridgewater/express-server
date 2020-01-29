const express = require('express');
const router = express.Router();

const {getAptHistory, getUserHistory} = require('../db/history');

router.get('/apartment/:apartmentId', async function(req, res, next) {
    try {
        const history = await getAptHistory(req.params.apartmentId);
        res.status(200).json(history)
    }catch(error) {
        res.status(404).json({error: error.message})
    }
});

router.get('/user/', async function(req, res, next) {
    try {
        const history = await getUserHistory(req.query);
        res.status(200).json(history)
    }catch(error) {
        res.status(404).json(error)
    }
})

module.exports = router