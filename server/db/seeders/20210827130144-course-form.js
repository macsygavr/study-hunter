'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('CourseForms', [{
        form: 'очная',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'заочная',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'онлайн',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('CourseForms', null, {});
  }
};
