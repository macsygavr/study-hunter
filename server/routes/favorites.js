const router = require('express').Router();
const db = require('../db/models');

router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  const newFavCourse = await db.Favorites.findOne({ where: { user_id: userId, course_id: courseId } });
  if (newFavCourse) res.status(403).send()
  else {
    await db.Favorites.create({ user_id: userId, course_id: courseId });
    const userFavorites = db.Favorites.findAll({where: {user_id: userId}, include: {model: db.Favorites}});
    console.log(userFavorites);
    res.json({userFavorites});
  }
});

module.exports = router;
