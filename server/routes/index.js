const router = require('express').Router();
const db = require('../db/models');

const DB = {
  courses: [
    {
      id: 1,
      organization_id: 1,
      name: 'Автомеханик 1',
      speciality_id: 1,
      price: '100',
      type_id: 1,
      description: 'Описание курса1',
    }, 
    {
      id: 2,
      organization_id: 1,
      name: 'Бухгалтер 2',
      speciality_id: 2,
      price: '120000',
      type_id: 3,
      description: 'Описание курса2',
    }, 
    {
      id: 3,
      organization_id: 1,
      name: 'Программист 3',
      speciality_id: 3,
      price: '300000',
      type_id: 2,
      description: 'Описание курса3',
    }, 
    {
      id: 4,
      organization_id: 1,
      name: 'Врач 4',
      speciality_id: 4,
      price: '40000',
      type_id: 2,
      description: 'Описание курса4',
    }, 
    {
      id: 5,
      organization_id: 1,
      name: 'Математик 5',
      speciality_id: 5,
      price: '50000',
      type_id: 1,
      description: 'Описание курса5',
    }
  ],
  specialities: [
    {
      id: 1,
      name: 'автомеханика'
    },
    {
      id: 2,
      name: 'бухгалтерия'
    },
    {
      id: 3,
      name: 'IT'
    },
    {
      id: 4,
      name: 'медицина'
    },
    {
      id: 5,
      name: 'точные науки'
    },
  ],
  courseForms: [
    {
      id: 1,
      form: 'Очное'
    },
    {
      id: 2,
      form: 'Заочное'
    },
    {
      id: 3,
      form: 'Дистанционное'
    },
  ]
}

router.get('/', (req, res) => {
  const arrOfCourses = []
  for (let i = 0; i < 3; i++) {
    let num = ((Math.random() * 10 / 2)).toFixed(0)
    if (num < 0) {
      num += 1
    }
    if (num >= 5) {
      num -= 1
    }
    console.log(num);
    arrOfCourses.push(DB.courses[num])
  }
  res.json({arrOfCourses})
})

router.post('/', (req, res) => {
  const {specialityId, typeId, priceMin, priceMax} = req.body
  let searchResult;
  console.log(specialityId, typeId);
  if (specialityId && typeId) {
    console.log('specialityId && typeId');
    searchResult = DB.courses.filter(item => item.speciality_id === Number(specialityId)).filter(item => item.type_id === Number(typeId))
  } else if (specialityId) {
    console.log('specialityId');
    searchResult = DB.courses.filter(item => item.speciality_id === Number(specialityId))
  }
  // const searchResult = DB.courses.filter(item => item.speciality_id === Number(specialityId))
  // const searchResult = DB.courses.filter(item => item.type_id === Number(typeId))
  // const searchResult = DB.courses.filter(item => Number(priceMin) <= Number(item.price) &&  Number(item.price) <= Number(priceMax))
  res.json(searchResult)
})

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('StudyHunter');
  res.cookie('StudyHunter', '', { expire: 1 });
  res.sendStatus(200);
});

router.post('/profile', async (req, res) => {
  res.json( {kek: 'profile'} );
});

module.exports = router;
