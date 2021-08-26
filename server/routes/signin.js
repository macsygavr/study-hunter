const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  console.log('signin');
});

router.post('/organization', async (req, res) => {
  console.log('signin');
});

module.exports = router;
