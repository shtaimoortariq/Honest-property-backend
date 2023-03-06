'use strict'
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const PropertyProfile = sequelize.define('PropertyProfile', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        property_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        kitchen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        garage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        garden: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        terrace: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        balcony: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        basement: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        parking: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        energy_provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telecom_provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    });
    PropertyProfile.beforeCreate((property_profile) => {
        property_profile.id = uuid()
    });
    return PropertyProfile;
}