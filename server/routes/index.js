const router = require('express').Router();
const db = require('../db/models');
const { Op } = require("sequelize");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/options', async (req, res) => {
  const arrOfSpecialitiesOptions = await db.Speciality.findAll({ raw: true })
  const arrOfTypesOptions = await db.CourseForm.findAll({ raw: true })
  res.json({ arrOfSpecialitiesOptions, arrOfTypesOptions });
});

router.get('/', async (req, res) => {
  const arrOfCourses = await db.Course.findAll({ raw: true })
  const randomCourses = []
  const arrOfRandomNums = []
  for (let i = 0; arrOfRandomNums.length < 6; i++) {
    const num = getRandomIntInclusive(0, arrOfCourses.length - 1)
    if (!arrOfRandomNums.includes(num)) {
      arrOfRandomNums.push(num)
      const currentType = await db.CourseForm.findOne({where: { id: arrOfCourses[num].CourseFormId }})
      const courseObj = {
        ...arrOfCourses[num],
        type: currentType.form
      }
      randomCourses.push(courseObj)
    }
  }
  res.json(randomCourses)
})

router.post('/', async (req, res) => {
  const { specialityId, typeId, priceMinValue, priceMaxValue, courseNameValue } = req.body
  const filters = {
    price: { [Op.and]: [{ [Op.gte]: Number(priceMinValue) }, { [Op.lte]: Number(priceMaxValue) }] }
  };
  if (specialityId !== 'Специальность') {
    filters.SpecialityId = Number(specialityId)
  }
  if (typeId !== 'Форма обучения') {
    filters.CourseFormId = Number(typeId)
  }
  if (courseNameValue.trim()) {
    filters.name = { [Op.iLike]: `%${courseNameValue}%` }
  }
  const searchResult = await db.Course.findAll({ where: filters })
  res.json(searchResult)
})

router.get('/logout', async (req, res) => {
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  req.session.destroy();
  res.status(200).send();
});

router.get('/profile/user', async (req, res) => {
  if (req.session.userid) {
    const user = await db.User.findOne({raw: true, where: {id: req.session.userid}});
    const favoritesFromDB = await db.Favorites.findAll({ raw: true, nest: true, where: {
      UserId: user.id,
    }, include: {model: db.Course} });
    const favorites = favoritesFromDB.map(course => course.Course);
    const requests = await db.Request.findAll({ raw: true, where: {
      UserId: user.id,
    } });
    return res.json({
      id: user.id,
      firstName: user.firstName, 
      lastName : user.lastName, 
      phone: user.phone, 
      email: user.email, 
      favorites: favorites || [], 
      requests: requests || [] });
  } else return res.status(401).end();
});

router.get('/course/:id', async (req, res) => {
  const { id } = req.params
  const currentCourse = await db.Course.findOne({where: { id }})
  const currentCourseType = await db.CourseForm.findOne({where: { id: currentCourse.CourseFormId }})
  const currentCourseOrganization = await db.Organization.findOne({where: { id: currentCourse.OrganizationId }})
  const currentCourseObj = {
    ...currentCourse,
    organization: currentCourseOrganization.name,
    form: currentCourseType.form,
  }
  res.json(currentCourseObj)
})

router.get('/organization/:id', async (req, res) => {
  const { id } = req.params
  const currentOrganization = await db.Organization.findOne({where: { id }})
  const currentOrganizationType = await db.OrganizationForm.findOne({where: { id: currentOrganization.OrganizationFormId }})
  const currentOrganizationCourses = await db.Course.findAll({where: { OrganizationId: currentOrganization.id }})
  res.json({currentOrganization, currentOrganizationCourses, currentOrganizationType});
})

module.exports = router;
