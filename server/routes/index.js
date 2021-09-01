const router = require('express').Router();
const db = require('../db/models');
const { Op } = require("sequelize");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

router.get('/options', async (req, res) => {
  const arrOfSpecialitiesOptions = await db.Speciality.findAll({ raw: true });
  const arrOfTypesOptions = await db.CourseForm.findAll({ raw: true });
  res.json({ arrOfSpecialitiesOptions, arrOfTypesOptions });
});

router.get('/options/forms', async (req, res) => {
  const arrOfOrgForms = await db.OrganizationForm.findAll({raw: true});
  res.json({arrOfOrgForms});
});

router.get('/', async (req, res) => {
  const arrOfCourses = await db.Course.findAll({ raw: true });
  const randomCourses = [];
  const arrOfRandomNums = [];
  for (let i = 0; arrOfRandomNums.length < 6; i++) {
    const num = getRandomIntInclusive(0, arrOfCourses.length - 1);
    if (!arrOfRandomNums.includes(num)) {
      arrOfRandomNums.push(num);
      const currentType = await db.CourseForm.findOne({where: { id: arrOfCourses[num].CourseFormId }});
      const courseObj = {
        ...arrOfCourses[num],
        type: currentType.form
      };
      randomCourses.push(courseObj);
    }
  }
  res.json(randomCourses);
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

router.post('/', async (req, res) => {
  const { specialityId, typeId, priceMinValue, priceMaxValue, courseNameValue } = req.body;
  const filters = {
    price: { [Op.and]: [{ [Op.gte]: Number(priceMinValue) }, { [Op.lte]: Number(priceMaxValue) }] }
  };
  if (specialityId !== 'Специальность') {
    filters.SpecialityId = Number(specialityId);
  }
  if (typeId !== 'Форма обучения') {
    filters.CourseFormId = Number(typeId);
  }
  if (courseNameValue.trim()) {
    filters.name = { [Op.iLike]: `%${courseNameValue}%` };
  }
  const searchResult = await db.Course.findAll({ where: filters });
  res.json(searchResult);
});

router.get('/logout', async (req, res) => {
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  req.session.destroy();
  res.status(200).send();
});

router.get('/profile/current', async (req, res) => {
  const isUser = req.session.userid;
  const isOrg = req.session.orgId;
  if (isUser) {
    const user = await db.User.findOne({raw: true, where: {id: isUser}});
    const favoritesFromDB = await db.Favorites.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course} });
    const favorites = favoritesFromDB.map(course => course.Course);
    const requestsFromDB = await db.Request.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course} });
    const requests = requestsFromDB.map(course => course.Course);

    return res.status(201).json({
        id: user.id,
        firstName: user.firstName, 
        lastName : user.lastName, 
        phone: user.phone, 
        email: user.email, 
        logo: user.logo,
        admin: user.admin,
        superadmin: user.superadmin,
        favorites: favorites || [], 
        requests: requests || [],
    });
  }

  if (isOrg) {
    const organization = await db.Organization.findOne({
      raw: true, 
      nest: true,
      where: {id: isOrg}, 
      include: {
        model: db.OrganizationForm
      }});
      const courses = await db.Course.findAll({raw: true, where: {OrganizationId: organization.id}});
    return res.status(202).json({
        id: organization.id,
        name: organization.name,
        phone: organization.phone,
        email: organization.email,
        is_checked: organization.is_checked,
        logo: organization.logo,
        description: organization.description,
        site: organization.site,
        address: organization.address,
        OrganizationFormId: organization.OrganizationFormId,
        OrganizationForm: organization.OrganizationForm.form,
        OrganizationCourses: courses,
    })
  }
  res.status(401).end();
});

router.get('/course/:id', async (req, res) => {
  const { id } = req.params;
  const currentCourse = await db.Course.findOne({where: { id }});
  const currentCourseType = await db.CourseForm.findOne({where: { id: currentCourse.CourseFormId }});
  const currentCourseOrganization = await db.Organization.findOne({where: { id: currentCourse.OrganizationId }});
  const currentCourseObj = {
    ...currentCourse,
    organization: currentCourseOrganization.name,
    form: currentCourseType.form,
  };
  res.json(currentCourseObj);
});

router.get('/organization/:id', async (req, res) => {
  const { id } = req.params;
  const currentOrganization = await db.Organization.findOne({where: { id }});
  const currentOrganizationType = await db.OrganizationForm.findOne({where: { id: currentOrganization.OrganizationFormId }});
  const currentOrganizationCourses = await db.Course.findAll({where: { OrganizationId: currentOrganization.id }});
  res.json({currentOrganization, currentOrganizationCourses, currentOrganizationType});
});

router.post('/request', async (req, res) => {
  const { userId, courseId } = req.body
  await db.Request.create({ UserId: userId, CourseId: courseId })
  res.end()
})

module.exports = router;
