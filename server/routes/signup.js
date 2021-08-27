const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  console.log(req.body);
  const user = await db.User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
      res.sendStatus(404);
    } else {
    const newUser = await db.User.create({ firstName, lastName, phone, email: email.toLowerCase(), password });
    console.log(newUser);
    req.session.userEmail = newUser.dataValues.email;
    req.session.userid = newUser.dataValues.id;
    res.json({
      firstName: newUser.firstName, 
      lastName : newUser.lastName, 
      phone: newUser.phone, 
      email: newUser.email, 
      favorites: [], 
      requests: []});
  }
});

router.post('/organization', async (req, res) => {
  console.log('signup organization');
  // const { name, phone, email, password } = req.body;
  // const organization = await db.Organization.findOne({ where: { email: email.toLowerCase() } });
  // if (organization) {
  //   res.sendStatus(404);
  // } else {
  //   const newOrganization = await db.Organization.create({ name, phone, email: email.toLowerCase(), password });
  //   console.log(newOrganization);
  // }
});

module.exports = router;
