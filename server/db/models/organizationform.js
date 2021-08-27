'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Organization, {foreignKey: 'organizationform_id'});
    }
  };
  OrganizationForm.init({
    form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrganizationForm',
  });
  return OrganizationForm;
};
