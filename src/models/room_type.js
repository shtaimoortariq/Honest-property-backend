'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const RoomType = sequelize.define('RoomType', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    RoomType.beforeCreate((RoomType, _) => {
        return RoomType.id = uuid();
    });

    return RoomType;
};
