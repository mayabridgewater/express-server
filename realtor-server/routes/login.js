var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {login} = require('../db/login');

router.post('/', async function(req, res, next) {
  const password = crypto.pbkdf2Sync(req.body.password, 'realtorproject', 10000, 64, 'sha512')
  try {
    const user = await login(req.body.email, password.toString('base64'));
    if (user.length === 0) { 
      res.status(401).json({error: 'invalid email or password'})
    } else {
        res.cookie('user', user[0], {maxAge: 1000 * 60 *60 *24});
        console.log(req.cookies);
        res.status(200).json('logged in!');
      }
  } catch(error) {
      res.status(500).json(error.message)
  }  
});

router.get('/', (req, res, next) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

  module.exports = router