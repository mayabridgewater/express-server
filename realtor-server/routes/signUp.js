var express = require('express');
var router = express.Router();
const {registerUser, updateUserHist} = require('../db/signUp');

router.post('/', function(req, res, next) {
    registerUser(req.body)
      .then(results => updateUserHist(results[0][0].id, results[0][0].status))
      .then(results => res.status(200).json(results))
      .catch(error => res.status(401).json({error: 'not valid'}))
});


module.exports = router