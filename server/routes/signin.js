const router = require('express').Router();
const db = require('../db/models');

router.get('/', async (req, res) => {
  console.log('signin');
});

module.exports = router;
