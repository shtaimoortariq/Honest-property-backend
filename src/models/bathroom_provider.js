'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const BathroomProvider = sequelize.define('BathroomProvider', {
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

    BathroomProvider.beforeCreate((BathroomProvider, _) => {
        return BathroomProvider.id = uuid();
    });

    return BathroomProvider;
};
