const router = require('express').Router();
const db = require('../db/models');

router.post('/signin', async (req, res) => {
  res.json( {kek: 'signin'} );
});

router.post('/signup', async (req, res) => {
  res.json( {kek: 'signup'} );
});

router.post('/logout', async (req, res) => {
  res.json( {kek: 'logout'} ); 
});

router.post('/profile', async (req, res) => {
  res.json( {kek: 'profile'} );
});

module.exports = router;
