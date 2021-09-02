const router = require('express').Router();
const db = require('../db/models');

router.post('/user', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email.toLowerCase(), password } });
  if (user) {
    req.session.userEmail = user.email;
    req.session.userid = user.id;
    const favoritesFromDB = await db.Favorites.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course, include: db.CourseForm} });
    const requestsFromDB = await db.Request.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course, include: db.CourseForm} });
    const favorites = favoritesFromDB.map(course => ({...course.Course, type: course.Course.CourseForm.form}));
    const requests = requestsFromDB.map(course => ({...course.Course, type: course.Course.CourseForm.form}));

    res.json({
      id: user.id,
      firstName: user.firstName, 
      lastName : user.lastName, 
      phone: user.phone, 
      email: user.email, 
      logo: user.logo,
      admin: user.admin,
      superadmin: user.superadmin,
      favorites: favorites || [], 
      requests: requests || [] });
  }
  else { res.sendStatus(401); }
});

router.post('/organization', async (req, res) => {
  const { email, password } = req.body;
  const organization = await db.Organization.findOne({
    raw: true, 
    nest: true,
    where: {email, password}, 
    include: {
      model: db.OrganizationForm
    }});
  if (organization) {
    const courses = await db.Course.findAll({raw: true, where: {OrganizationId: organization.id}});
    
    let requestsFromDB = await db.Request.findAll({raw: true, nest: true, include: [{model: db.User}, {model: db.Course} ]}); 
    requestsFromDB = requestsFromDB.filter(item => item.Course.OrganizationId === organization.id);
    const requests = requestsFromDB.map(request => ({
      userId: request.User.id,
      userFirstName: request.User.firstName,
      userLastName: request.User.lastName,
      userPhone: request.User.phone,
      userEmail: request.User.email,
      courseId: request.Course.id,
      courseName: request.Course.name,
    }));

    req.session.orgEmail = organization.email;
    req.session.orgId = organization.id;
    
    res.status(202).json({
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
      OrganizationRequests: requests,
    });
  }
});

module.exports = router;
