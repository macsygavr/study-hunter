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
      logo: '/userPhotos/3bcb5bb7-3784-4c0c-9651-0f04ac08d107-icon.png',
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
