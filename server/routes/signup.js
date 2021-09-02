const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
      res.sendStatus(404);
    } else {
    const newUser = await db.User.create({ firstName, lastName, phone, email: email.toLowerCase(), password });
    req.session.userEmail = newUser.email;
    req.session.userid = newUser.id;
    res.json({
      id: newUser.id,
      firstName: newUser.firstName, 
      lastName : newUser.lastName, 
      phone: newUser.phone, 
      email: newUser.email, 
      logo: newUser.logo,
      admin: newUser.admin,
      superadmin: newUser.superadmin,
      favorites: [], 
      requests: []});
  }
});

router.post('/quickuser', async (req, res) => {
  const { firstName, lastName, phone, email, password, courseId } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
      res.sendStatus(404);
    } else {
    const newUser = await db.User.create({ firstName, lastName, phone, email: email.toLowerCase(), password });
    const userRequest = await db.Request.findOne({where: {UserId: newUser.id, CourseId: courseId}});
    if (!userRequest) {
      await db.Request.create({ UserId: newUser.id, CourseId: courseId });
    }
    const requestsFromDB = await db.Request.findAll({ raw: true, nest: true, where: {
      UserId: newUser.id,
    }, include: {model: db.Course, include: db.CourseForm} });
    const requests = requestsFromDB.map(course => ({...course.Course, type: course.Course.CourseForm.form}));

    req.session.userEmail = newUser.email;
    req.session.userid = newUser.id;
    res.json({
      id: newUser.id,
      firstName: newUser.firstName, 
      lastName : newUser.lastName, 
      phone: newUser.phone, 
      email: newUser.email, 
      logo: newUser.logo,
      admin: newUser.admin,
      superadmin: newUser.superadmin,
      favorites: [], 
      requests: requests || []});
  }
});

router.post('/organization', async (req, res) => {
  const {name, phone, email, form, password} = req.body;
  const organization = await db.Organization.findOne({ where: { email: email.toLowerCase() } });
  if (organization) {
    res.status(409).send();
  } else {
    await db.Organization.create({ 
      name, 
      phone, 
      email: email.toLowerCase(), 
      password, 
      OrganizationFormId: Number(form) 
    });
    const organization = await db.Organization.findOne({
      raw: true, 
      nest: true,
      where: {email: email.toLowerCase()}, 
      include: {
        model: db.OrganizationForm
      }});
    const courses = await db.Course.findAll({raw: true, where: {OrganizationId: organization.id}});
    req.session.orgEmail = organization.email;
    req.session.orgId = organization.id;
    console.log(organization);
    res.json({
      id: organization.id,
      name: organization.name,
      phone: organization.phone,
      email: organization.email,
      is_checked: organization.is_checked,
      is_allowed: organization.is_allowed,
      logo: organization.logo,
      description: organization.description,
      site: organization.site,
      address: organization.address,
      OrganizationFormId: organization.OrganizationFormId,
      OrganizationForm: organization.OrganizationForm.form,
      OrganizationCourses: courses,
    });
  }
});

module.exports = router;
