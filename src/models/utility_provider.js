'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const UtilityProvider = sequelize.define('UtilityProvider', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(16),
    },
  });

  UtilityProvider.beforeCreate(
    (utilityProvider, _) => (utilityProvider.id = uuid())
  );

  return UtilityProvider;
};
