'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const FileStats = sequelize.define('FileStats', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_id: {
            type: DataTypes.STRING
        },
        property_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_type_name: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //enum: PHOTO, DOCUMENT, FLOORPLAN
        document_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        metadata: {
            type: DataTypes.JSON
        },
        document_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    FileStats.beforeCreate((fileStats, _) => {
        return fileStats.id = uuid();
    });

    return FileStats;
};
