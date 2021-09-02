const router = require("express").Router();
const db = require("../db/models");
const { Op } = require("sequelize");

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
  const result = allRequests.map((item) => item = { 
    id: item.id,
    name: item.name,
    is_checked: item.is_checked,
    is_allowed: item.is_allowed,
  });
  res.json(result);
});

router.get('/alladmins', async (req, res) => {
  const userList = await db.User.findAll({ where: {
    superadmin: false,
    admin: true,
  } });
  console.log(userList);
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

router.patch('/changebid', async (req, res) => {
  if (req.body) {
    const { status, id } = req.body;
    const org = await db.Organization.findOne({ where: id });
    if (status === 'accept') {
      console.log(org);
      await db.Organization.update( { is_checked: true, is_allowed: true }, { where: { id: org.id } });
    }
    else if (status === 'decline') {
      await db.Organization.update( { is_checked: true, is_allowed: false }, { where: { id: org.id } });
    } 
    else {
      res.sendStatus(400);
    }
    const newStatus = await db.Organization.findOne({ raw: true, where: id });
    console.log(newStatus);
    res.json(newStatus.is_checked);
}
});

router.post('/usersearch', async (req, res) => {
  const { email } = req.body;
  const result = await db.User.findAll({where: {
    email: {
      [Op.like]: `%${email.toLowerCase()}%`,
    }
  }});
  res.json(result);
});

module.exports = router;
