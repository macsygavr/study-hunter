'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Favorites);
      this.hasMany(models.Request);
      this.belongsTo(models.Organization);
      this.belongsTo(models.Speciality);
      this.belongsTo(models.CourseForm);
    }
  };
  Course.init({
    OrganizationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    SpecialityId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    CourseFormId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
