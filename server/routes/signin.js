const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  console.log('signin user');
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase(), password } });
  if (user) {
    req.session.userEmail = user.email;
    req.session.userid = user.id;
    const favoritesFromDB = await db.Favorites.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course} });
    const favorites = favoritesFromDB.map(course => course.Course);
    const requests = await db.Request.findAll({ raw: true, where: {
      UserId: user.id,
    } });
    console.log(user);
    res.json({
      id: user.id,
      firstName: user.firstName, 
      lastName : user.lastName, 
      phone: user.phone, 
      email: user.email, 
      admin: user.admin,
      superadmin: user.superadmin,
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
