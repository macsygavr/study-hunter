'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OrganizationForm, {foreignKey: 'organizationform_id'});
    }
  }
  Organization.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_checked: DataTypes.BOOLEAN,
    logo: DataTypes.TEXT,
    description: DataTypes.TEXT,
    site: DataTypes.TEXT,
    address: DataTypes.TEXT,
    organizationform_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};
