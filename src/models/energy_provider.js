'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const EnergyProvider = sequelize.define('EnergyProvider', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    EnergyProvider.beforeCreate((EnergyProvider, _) => {
        return EnergyProvider.id = uuid();
    });

    return EnergyProvider;
};
