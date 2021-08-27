'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Specialities', [{
        name: 'иностранные языки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'информационные технологии',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'искусство и творчество',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'медиа, дизайн и архитектура',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'медицина и здравоохранение',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'сфера услуг',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'точные и естественные науки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'управление и экономика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'энергетика и машиностроение',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Specialities', null, {});
  }
};
