'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizations',
          foreignKey: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      speciality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        references: {
          model: 'Specialities',
          foreignKey: 'id'
        }
      },
      price: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};
