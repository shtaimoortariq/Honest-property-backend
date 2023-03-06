'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const TelecomProvider = sequelize.define('TelecomProvider', {
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

    TelecomProvider.beforeCreate((TelecomProvider, _) => {
        return TelecomProvider.id = uuid();
    });

    return TelecomProvider;
};
