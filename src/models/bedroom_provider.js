'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const BedroomProvider = sequelize.define('BedroomProvider', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    BedroomProvider.beforeCreate((BedroomProvider, _) => {
        return BedroomProvider.id = uuid();
    });

    return BedroomProvider;
};
