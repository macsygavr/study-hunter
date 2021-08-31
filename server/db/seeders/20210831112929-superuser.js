'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
      firstName: 'Super',
      lastName: 'Admin',
      phone: '88005553535',
      email: 'sa@sh.ru',
      password: 'study',
      admin: true,
      superadmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
