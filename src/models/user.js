'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email_id: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    primary_property_id: {
      type: DataTypes.STRING,
    },
    profile_image_path: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    }
  });

  /*
    User.beforeCreate((user, _) => {
        return user.id = uuid();
    });
    */

  return User;
};
