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
  const arrOfCourses = await db.Course.findAll({raw: true})
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
  const {specialityId, typeId, priceMin, priceMax} = req.body
  let searchResult;
  console.log(specialityId, typeId, priceMin, priceMax);
  searchResult = await db.Course.findAll({where: { SpecialityId: specialityId, CourseFormId: typeId,  price: {[Op.and]: [{[Op.gte]: Number(priceMin)}, {[Op.lte]: Number(priceMax)}]}}})
  res.json(searchResult)
})

router.get('/logout', async (req, res) => {
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  req.session.destroy();
  res.status(200).send();
});

router.get('/profile', async (req, res) => {
  console.log('getting profile --> ', req.session.userid);
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


module.exports = router;
