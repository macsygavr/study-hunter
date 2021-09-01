const router = require("express").Router();
const db = require("../db/models");
// const { Op } = require("sequelize");

router.patch('/changestatus', async (req, res) => {
  if (req.body) {
    const { id } = req.body;
    const user = await db.User.findOne({ raw: true, where: id });
    await db.User.update( { admin: !user.admin }, { where: { id: user.id } });
    const newAdmin = await db.User.findOne({ raw: true, where: id });
    res.json(newAdmin.admin);
  } else {
    res.sendStatus(400);
  }
});

router.get('/bid', async (req, res) => {
  const allRequests = await db.Organization.findAll({raw: true}, {where: {is_checked: false, is_allowed: false}});
  console.log(allRequests);
  const result = allRequests.map((item) => item = { 
    id: item.id,
    name: item.name,
  });
  res.json(result);
});

router.get('/allusers', async (req, res) => {
  const userList = await db.User.findAll({ raw: true });
  const result = userList.map((item) => item = { 
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    admin: item.admin,
    email: item.email,
    superadmin: item.superadmin,
  });
  res.json(result);
});

module.exports = router;
