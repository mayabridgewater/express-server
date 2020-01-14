const express = require('express');
const router = express.Router();

const {getApartments, 
       byId, 
       addApartment, 
       updateApartmentHistory, 
       updateApartment} = require('../db/apartment');

const {checkPermissions} = require('../db/users');

router.get('/', async function(req, res, next) {
    try {
        const apartments = await getApartments(req.query);
        res.status(200).json(apartments)
    } catch(error) {
        res.status(500).json(error.message)
    }
});

router.get('/:apartmentId', async function(req, res, next) {
    try {
        const apartment = await byId(req.params.apartmentId);
        res.status(200).json(apartment)
    } catch {
        res.status(500).json({error: error.message})
    }
});

router.post('/', async function(req, res, next) {
    try {
        const permission = await checkPermissions('add_apartment', req.cookies.user);
        if (permission.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
        } else {
            const newApartment = await addApartment(req.cookies.user.id, req.body);
            const update = await updateApartmentHistory(newApartment[0][0].id, newApartment[0][0].user_id, newApartment[0][0].status);
            res.status(200).json('apartment added!');
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }
});

router.put('/', function(req, res, next) {
    checkPermissions('update_apartment', req.cookies.user)
      .then( results => {
          if (results.length === 0) {
            res.status(400).json({error: 'Request not authorized'})
          } else {
              updateApartment(req.body)
                .then(updateApartmentHistory(req.body.id, req.body.user_id, 'pending', 'update made'))
                  .then(res.status(200).json('apartment updated, awaiting approval'))
                  .catch(error => res.status(500).json(error))

          }
    });
});




module.exports = router