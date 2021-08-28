'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      // this.belongsTo(models.Course, {
      //   foreignKey: 'CourseId',
      // });
    }
  };
  Request.init({
    UserId: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_phone: DataTypes.STRING,
    user_email: DataTypes.STRING,
    text: DataTypes.TEXT,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};
