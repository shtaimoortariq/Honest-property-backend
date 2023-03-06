'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        property_address: {
            type: DataTypes.STRING
        }
    });

    /*Property.beforeCreate((property, _) => {
        return property.id = uuid();
    });*/

    return Property;
};
