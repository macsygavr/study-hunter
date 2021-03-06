const router = require('express').Router();
const db = require('../db/models');
const course = require('../db/models/course');

router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  const newFavCourse = await db.Favorites.findOne({ raw: true, where: { UserId: userId, CourseId: courseId } });
  if (newFavCourse) res.status(403).send();
  else {
    await db.Favorites.create({ UserId: userId, CourseId: courseId });
    const userFavoritesFromDb = await db.Favorites.findAll({
      raw: true, 
      nest: true, 
      where: {UserId: userId}, 
      include: {
        model: db.Course, 
        include: db.CourseForm
      }});
    const userFavorites = userFavoritesFromDb.map(course => ({...course.Course, type: course.Course.CourseForm.form}));
    res.json({userFavorites});
  }
});

router.delete('/', async (req, res) => {
  const { userId, courseId } = req.body;
  const currFavCourse = await db.Favorites.findOne({ raw: true, where: { UserId: userId, CourseId: courseId } });
  if (!currFavCourse) res.status(403).send();
  else {
    await db.Favorites.destroy({ where: { UserId: userId, CourseId: courseId } });
    const userFavoritesFromDb = await db.Favorites.findAll({raw: true, nest: true, where: {UserId: userId}, include: {model: db.Course}});
    const userFavorites = userFavoritesFromDb.map(course => course.Course);
    res.json({userFavorites});
  }
});

module.exports = router;
