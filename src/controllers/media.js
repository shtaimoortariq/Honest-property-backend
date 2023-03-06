const models = require('../models');
const _ = require('lodash');
const commanUtils = require('../utils/common');
const utils = require('../lib/utils');
const jwt = require('jsonwebtoken');
const restResponse = require('../lib/rest_response');
const fs = require('fs');
const FileStatsDocType = Object.freeze({ "doc": "DOCUMENT", "photo": "PHOTO", "floorplan": "FLOORPLAN" });
const { v4: uuid } = require('uuid');
const { response } = require('express');
const Op = require('sequelize').Op;

const mediaController = {
    saveImage: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        const emailId = req.query.email_id;
        const propertyId = req.query.property_id;
        const roomId = req.query.room_id;
        const roomTypeName = req.query.room_type_name;
        const fileMetaData = req.query.metadata;
        const description = req.query.description;
        const filePermPath = process.env.USER_DIR_PATH + userId;
        var noOfFilesUploaded = 0;
        let response = restResponse();

        req.files.fileName.forEach(function (file, index) {
            console.log("File size is " + file.size + " index: " + index);
            const fileNameObject = req.files.fileName[index];
            const fileTmpPath = fileNameObject.path;
            var fileSizeInBytes = fileNameObject.size;
            var name, docType;
            if (req.query.type !== undefined && req.query.type !== '') {
                docType = req.query.type;
            }
            if (req.query.name !== undefined && req.query.name !== '') {
                name = req.query.name;
            } else {
                name = fileNameObject.originalname;
            }

            if (['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'image/jpg'].indexOf(fileNameObject.mimetype.toLowerCase()) === -1) {
                response.success = false;
                response.errors = ['Invalid file type'];
                fs.unlink(fileTmpPath, err => {
                    if (err) console.log('Error while removing tmp file: ', err);
                });

                return res.json(response);
            }
            //console.log("file name object is " + JSON.stringify(fileNameObject));
            //console.log("file name is " + fileNameObject.originalname);
            //console.log("file size in bytes: " + fileSizeInBytes);
            //console.log("file name: " + name);

            if (fileSizeInBytes <= process.env.UPLOAD_IMAGE_MAX_SIZE) {
                const token = req.headers.authorization;
                const userId = utils.getPayload(token).id;
                const destinationFile = filePermPath + "/" + name;
                try {
                    if (!fs.existsSync(filePermPath)) {
                        fs.mkdirSync(filePermPath, { recursive: true });
                    }
                } catch (err) {
                    console.error(err);
                }
                fs.writeFileSync(destinationFile, fs.readFileSync(fileTmpPath));
                fs.unlink(fileTmpPath, err => {
                    if (err) console.log('Error while removing tmp file: ', err);
                });
                console.log("permanent file is located at: " + destinationFile);

                //upload to the db
                let fileStatsData = {};
                fileStatsData.user_id = userId;
                fileStatsData.email_id = emailId;
                fileStatsData.property_id = propertyId;
                fileStatsData.room_id = roomId;
                fileStatsData.room_type_name = roomTypeName;
                fileStatsData.name = name;
                fileStatsData.description = description;
                if (docType == FileStatsDocType.doc.valueOf()) {
                    fileStatsData.document_type = FileStatsDocType.doc;
                } else if (docType == FileStatsDocType.floorplan.valueOf()) {
                    fileStatsData.document_type = FileStatsDocType.floorplan;
                } else {
                    fileStatsData.document_type = FileStatsDocType.photo;
                }
                fileStatsData.document_date = new Date();  // current timestamp
                fileStatsData.metadata = fileMetaData;
                models.FileStats.create(fileStatsData).then(function ({ dataValues }) {
                    noOfFilesUploaded++;
                    //console.log('No of files uploaded' + noOfFilesUploaded + ' returned Value ', JSON.stringify(dataValues));
                }).catch(err => {
                    console.log('err', err);
                });

            } else {
                fs.unlink(fileTmpPath, err => {
                    if (err) console.log('Error while removing tmp file: ', err);
                });
                response.success = false;
                response.errors.push('File size exceeds the max size limit');
                console.log('File size exceeds the limit for uploading image');
                return res.json(response);
            }
        });

        //todo: error handling if there are any issues
        response.success = true;
        response.content = noOfFilesUploaded;
        //return a response
        /*res.json({
            success: true,
            content: {
                "noOfFilesUploaded" : noOfFilesUploaded
            }
        });*/
        return res.json(response);
    },

    updateMedia: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        const mediaId = req.query.id;
        const filePermPath = process.env.USER_DIR_PATH + userId;
        const jsonResponse = restResponse();
        console.log('response', req.body)
        let updateData = {};
        //todo: find by id and user id to ensure security
        mediaController.findById(mediaId, media => {
            const oldName = media.name;
            if (media !== null) {

                if (req.body.name !== undefined && req.body.name !== '') {
                    updateData.name = req.body.name;
                }
                if (req.body.document_type !== undefined && req.body.document_type !== '') {
                    updateData.document_type = req.body.document_type;
                }
                if (req.body.document_date !== undefined && req.body.document_date !== '') {
                    updateData.document_date = req.body.document_date;
                }
                if (req.body.room_id !== undefined && req.body.room_id !== '') {
                    updateData.room_id = req.body.room_id;
                }
                if (req.body.room_type_name !== undefined && req.body.room_type_name !== '') {
                    updateData.room_type_name = req.body.room_type_name;
                }
                if (req.body.description !== undefined && req.body.description !== '') {
                    updateData.description = req.body.description;
                }

                media.update(updateData).then(updatedMedia => {
                    if (updatedMedia) {
                        jsonResponse.success = true;
                        jsonResponse.content = updatedMedia;
                        const destinationFile = filePermPath + "/" + req.body.name;
                        const destinationOldFile = filePermPath + "/" + oldName;
                        fs.rename(destinationOldFile, destinationFile, function (err) {
                            if (err) {
                                jsonResponse.success = false;
                                jsonResponse.errors.message = 'Unable to update media file name';
                                console.log('Error while updating media file name for user with media id: ' + mediaId + ' ERROR: ' + err);
                                return res.json(jsonResponse);
                            };
                            console.log('File Renamed.');
                        });
                        res.json(jsonResponse);
                    }
                }, error => {
                    jsonResponse.success = false;
                    jsonResponse.errors.message = 'Unable to update media';
                    console.log('Error while updating media for user with media id: ' + mediaId + ' ERROR: ' + error);
                    return res.json(jsonResponse);
                });
            }
            else {
                jsonResponse.success = false;
                jsonResponse.errors.push("Media Not found");
                console.log("Media not found. Authorization error");
                return res.sendStatus(401);
            }
        });
    },

    listAllMedia: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        let response = restResponse();
        // filter by Room and FileType
        let mediaFilterList = { user_id: userId, is_deleted: false };
        if (req.query.room_id !== undefined && req.query.room_id !== '') {
            mediaFilterList.room_id = req.query.room_id;
        }
        if (req.query.document_type !== undefined && req.query.document_type !== '') {
            let docTypeFilter = { [Op.in]: JSON.parse(req.query.document_type) };
            mediaFilterList.document_type = docTypeFilter;
        }

        models.FileStats.findAll(
            {
                where: mediaFilterList,
                // Add order conditions here....
                order: [['document_date', 'DESC']],
                attributes: ['id', 'name', 'document_type', 'metadata', 'document_date', 'room_id', 'room_type_name', 'description']
            }).then(files => {
                res.json({
                    success: true,
                    content: files
                });
                return res;
            }).catch(err => {
                console.log('err', err);
            })
    },

    listFiles: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        let response = restResponse();
        const filePermPath = process.env.USER_DIR_PATH + userId;

        fs.readdir(filePermPath, function (err, items) {
            if (err) {
                response.success = false;
                response.errors.push('User Dir not found');
                console.log('User Dir not found: ' + filePermPath);
                return res.json(response);
            }
            response.success = true;
            response.content = {
                "user_id": userId,
                "files": items
            };
            res.json(response);
        });
    },

    readMedia: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        var fileName;
        if (req.query.file_name !== undefined && req.query.file_name !== '') {
            fileName = req.query.file_name;
        }
        let response = restResponse();
        const filePermPath = process.env.USER_DIR_PATH + userId + "/" + fileName;

        fs.readFile(filePermPath, function (err, image) {
            if (err) {
                response.success = false;
                response.errors.push('File not found');
                console.log('File not found: ' + filePermPath);
                return res.json(response);
            }
            //const img = Buffer.from(image,);
            const img = Buffer.from(image, 'base64');
            if (fileName.includes('.pdf')) {
                res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': img.length });
                res.end(img);
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length });
                res.end(img);
            }
        });
    },

    deleteMedia: (req, res) => {
        const token = req.headers.authorization;
        const userId = utils.getPayload(token).id;
        var fileName;
        if (req.body.file_name !== undefined && req.body.file_name !== '') {
            fileName = req.body.file_name;
        }
        let response = restResponse();
        const filePermPath = process.env.USER_DIR_PATH + userId + "/" + fileName;

        // find a record in DB given user id and file name
        models.FileStats.findOne({ where: { user_id: userId, name: fileName } })
            .then(record => {
                if (!record) {
                    console.log('No record found for given userId and file name');
                    response.success = false;
                    response.errors.push('File not found in DB');
                    console.log('File not found in DB: ' + filePermPath);
                    return res.json(response);
                }

                //console.log(`retrieved record ${JSON.stringify(record, null, 2)}`);

                let values = {
                    is_deleted: true
                };

                //update db with is_deleted as 'true'
                record.update(values).then(updatedRecord => {
                    console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`);

                    //Delete file from disk
                    fs.unlink(filePermPath, function (err, image) {
                        if (err) {
                            response.success = false;
                            response.errors.push('File not found on disk');
                            console.log('File not found on disk: ' + filePermPath);
                            return res.json(response);
                        }
                        response.success = true;
                        response.content = {
                            "user_id": userId,
                            "deleted_file": fileName
                        };
                        res.json(response);
                    });
                })
            })
            .catch((error) => {
                // do seomthing with the error
                console.log('ERROR:', error);
                response.success = false;
                response.errors.push('File not found');
                console.log('File not found: ' + filePermPath);
                return res.json(response);
            })
    },

    findById: (id, res) => {
        models.FileStats.findOne({ where: { id: id } }).then(fileStats => {
            res(fileStats);
        })
    }

};

module.exports = mediaController;
