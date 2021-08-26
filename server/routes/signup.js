const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  console.log('signup');
});

router.post('/organization', async (req, res) => {
  console.log('signup');
});

module.exports = router;
