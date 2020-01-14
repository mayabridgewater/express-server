var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {login} = require('../db/login');

router.post('/', async function(req, res, next) {
  try {
    const user = await login(req.body.email, req.body.password);
    if (user.length === 0) { 
      res.status(401).json({error: 'invalid email or password'})
    } else {
      //   const password = crypto.pbkdf2Sync(result[0].password, 'realtorpassword', 10000, 64, 'sha512')
        res.cookie('user', user[0], {maxAge: 1000 * 60 *60 *24});
        res.send(req.cookies);
      }
  } catch(error) {
      res.status(500).json(error.message)
  }  
});

  module.exports = router