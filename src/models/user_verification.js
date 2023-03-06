'use strict';
const { v4: uuid } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('UserVerification', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_verification_token: {
            type: DataTypes.STRING
        },
        sms_verification_token: {
            type: DataTypes.STRING
        },
        is_valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        expiry: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    UserVerification.beforeCreate((UserVerification, _) => {
        return UserVerification.id = uuid();
    });

    return UserVerification;
};