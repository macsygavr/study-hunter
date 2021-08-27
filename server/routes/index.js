const router = require('express').Router();
const db = require('../db/models');

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  res.sendStatus(200);
});

router.post('/profile', async (req, res) => {
  res.json( {kek: 'profile'} );
});

module.exports = router;
