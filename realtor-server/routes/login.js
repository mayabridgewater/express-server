var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {login} = require('../db/login');

router.post('/', function(req, res, next) {
    login(req.body.email, req.body.password)
      .then(result => {
        if (result.length === 0) {
          res.status(401).json({error: 'invalid email or password'})
        } else {
        //   const password = crypto.pbkdf2Sync(result[0].password, 'realtorpassword', 10000, 64, 'sha512')
          res.cookie('user', result[0]);
          res.send(req.cookies)
        }
      })
  });

  module.exports = router