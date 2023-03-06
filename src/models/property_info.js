'use strict'
const { v4: uuid } = require('uuid');
const {DataTypes} = require('sequelize')
module.exports = (sequelize) => {
    const PropertyInfo = sequelize.define('PropertyInfo', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        property_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownership_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_moved_in: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        price_or_rent: {
            type: DataTypes.FLOAT
        }
    });
    PropertyInfo.beforeCreate((property_info)=>{
        property_info.id = uuid()
    });
    return PropertyInfo;
}