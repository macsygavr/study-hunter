const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  console.log('signin user');
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase(), password } });
  if (user) {
    req.session.userEmail = user.email;
    req.session.userid = user.id;
    const favorites = await db.Favorites.findAll({ where: {
      user_id: user.id,
    }});
    const requests = await db.Request.findAll({ where: {
      user_id: user.id,
    }});
    res.json({
      firstName: user.firstName, 
      lastName : user.lastName, 
      phone: user.phone, 
      email: user.email, 
      favorites: favorites || [], 
      requests: requests || [] });
  }
  else { res.sendStatus(401); }
});

router.post('/organization', async (req, res) => {
  console.log('signin organization');
  const { email, password } = req.body;
  const organization = await db.Organization.findOne({ where: { email: email.toLowerCase(), password } });
  if (organization) {
    req.session.organizaionEmail = organization.email;
    req.session.Organizationid = organization.id;
  }
  else { res.sendStatus(401); }
});

module.exports = router;
