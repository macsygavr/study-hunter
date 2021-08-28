'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Course);
    }
  };
  CourseForm.init({
    form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseForm',
  });
  return CourseForm;
};
