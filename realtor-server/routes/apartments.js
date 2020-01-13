const express = require('express');
const router = express.Router();
const {getApartments, byId, addApartment, updateApartmentHistory} = require('../db/apartment');
const {checkPermissions} = require('../db/users');

router.get('/', function(req, res, next) {
    getApartments(req.query)
        .then((results) => res.json(results))
});

router.get('/:apartmentId', function(req, res, next) {
    byId(req.params.apartmentId)
     .then(apartment => res.status(200).json(apartment))
     .catch(error => res.status(500).json({error: error.message}))
});

router.post('/', function(req, res, next) {
    checkPermissions('add_apartment', req.cookies.user)
      .then(results => {
          if (results.length === 0) {
              res.status(400).json({error: 'Request not authorized'})
          } else {
              addApartment(req.cookies.user.id, req.body)
              .then(results => updateApartmentHistory(results[0][0].id, results[0][0].user_id, results[0][0].status))
              .then(res.status(200).json('apartment added!'))
              .catch(error => res.status(400).json({error: error.message}))
          }
      });
});

router.put('/', function(req, res, next) {

});


module.exports = router