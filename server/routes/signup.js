const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase() } });
  console.log(user === true);
  if (user) {
      res.sendStatus(404);
    } else {
    console.log(firstName, lastName, email, password);
    const newUser = await db.User.create({ firstName, lastName, email: email.toLowerCase(), password: password });
    console.log(newUser);
  }
});

router.post('/organization', async (req, res) => {
  console.log('signup');
  const { name, phone, email, password } = req.body;
  const organization = await db.Organization.findOne({ where: { email: email.toLowerCase() } });
  if (organization) {
    res.sendStatus(404);
  } else {
    const newOrganization = await db.Organization.create({ name, phone, email: email.toLowerCase(), password });
    console.log(newOrganization);
  }
});

module.exports = router;
