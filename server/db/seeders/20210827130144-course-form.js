'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('CourseForms', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('CourseForms', null, {});
  }
};
