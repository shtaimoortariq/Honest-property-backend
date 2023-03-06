'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        property_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_type_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_type_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    });

    Room.beforeCreate((room, _) => {
        return room.id = uuid();
    });

    // User.associate = function(models) {
    //   models.User.hasMany(models.Task);
    // };

    return Room;
};
