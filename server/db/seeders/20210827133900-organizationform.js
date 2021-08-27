'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('OrganizationForms', [{
        form: 'ВУЗ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'колледж',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'курс',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('OrganizationForms', null, {});
  }
};
