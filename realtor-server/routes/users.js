var express = require('express');
var router = express.Router();

const {getUsers, updateUserStatus, updateHistory, checkPermissions} = require('../db/users');

router.get('/', async function(req, res, next) {
  try {
    const results = await getUsers(req.query);
    res.status(200).json(results)
  }catch(error) {
    res.status(500).json({error: error.message})
  }
});

router.put('/', async function(req, res, next) {
  try{
    const permission = await checkPermissions('block_user', JSON.parse(req.cookies.user));
    if (permission.length) {
      const updateUser = await updateUserStatus(req.body);
      const updatedHistory = await updateHistory(req.body);
      res.status(200).json('success')
    }else {
      res.status(400).json('error')
    }
  }catch(error) {
    res.status(500).json(error)
  }
})


module.exports = router;
