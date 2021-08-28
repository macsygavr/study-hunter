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
      randomCourses.push(arrOfCourses[num])
    }
  }
  res.json(randomCourses)
})

router.post('/', async (req, res) => {
  const { specialityId, typeId, priceMin, priceMax } = req.body
  const filters = {
    price: { [Op.and]: [{ [Op.gte]: Number(priceMin) }, { [Op.lte]: Number(priceMax) }] }
  };
  if (specialityId !== 'Специальность') {
    filters.SpecialityId = Number(specialityId)
  }
  if (typeId !== 'Форма обучения') {
    filters.CourseFormId = Number(typeId)
  }
  const searchResult = await db.Course.findAll({ where: filters })
  res.json(searchResult)
})

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  res.sendStatus(200);
});

router.post('/profile', async (req, res) => {
  res.json({ kek: 'profile' });
});


module.exports = router;
