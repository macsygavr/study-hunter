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
      this.hasMany(models.Favorites, {foreignKey: 'course_id'});
      this.hasMany(models.Request, {foreignKey: 'course_id'});
      this.belongsTo(models.Organization, {foreignKey: 'organization_id'});
      this.belongsTo(models.Speciality, {foreignKey: 'speciality_id'});
    }
  };
  Course.init({
    organization_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    speciality_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    courseform_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
