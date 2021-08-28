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
      OrganizationId: {
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
      SpecialityId: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        references: {
          model: 'Specialities',
          foreignKey: 'id'
        }
      },
      price: {
        type: Sequelize.INTEGER
      },
      CourseFormId: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        references: {
          model: 'CourseForms',
          foreignKey: 'id'
        }
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
