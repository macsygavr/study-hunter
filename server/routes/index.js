const router = require('express').Router();
const db = require('../db/models');

router.post('/logout', async (req, res) => {
  res.json( {kek: 'logout'} ); 
});

router.post('/profile', async (req, res) => {
  res.json( {kek: 'profile'} );
});

module.exports = router;
