'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const KitchenProvider = sequelize.define('KitchenProvider', {
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

    KitchenProvider.beforeCreate((KitchenProvider, _) => {
        return KitchenProvider.id = uuid();
    });

    return KitchenProvider;
};
