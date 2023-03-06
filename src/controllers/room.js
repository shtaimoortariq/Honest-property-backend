const models = require('../models');
const _ = require('lodash');
const utils = require('../lib/utils');
const jwt = require('jsonwebtoken');

const roomController = {
    createRoom: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        const propertyId = req.body.property_id;
        const roomTypeId = req.body.room_type_id;
        const roomTypeName = req.body.room_type_name;
        const description = req.body.description;
        let roomData = {};
        roomData.user_id = userId;
        roomData.property_id = propertyId;
        //todo: Check for security that property id belongs to the given user id.
        roomData.room_type_id = roomTypeId;
        roomData.room_type_name = roomTypeName;
        roomData.description = description;
        models.Room.create(roomData).then(function ({dataValues}) {
            res.status(201);
            res.json({
                success: true,
                message: 'Room created successfully',
                data: dataValues
            });
            return res;
        }).catch(err => {
            console.log('err', err);
        });
    },

    getRoomForUser: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        //todo: check for empty property id
        const propertyId = req.query.property_id;
        //todo: Check for security. property belongs to the same user.
        models.Room.findAll({where: {property_id: propertyId}}).then (rooms => {
            res.json({
                success: true,
                content: rooms
            });
            return res;
        }).catch(err => {
            console.log('err', err);
        });
    },

    listAllTypes: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;

        models.RoomType.findAll().then (roomTypes => {
                res.json({
                    success: true,
                    content: roomTypes
                });
                return res;
        }).catch(err => {
            console.log('err', err);
        });
    }
};

module.exports = roomController;