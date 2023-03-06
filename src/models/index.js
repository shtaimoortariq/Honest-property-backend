'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
let db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
sequelize
  .authenticate()
  .then((data) => {
    console.log('Connection has been established successfully.', data);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
//   console.log(tableObj);
// });

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//   })
//   .forEach((file) => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

let modules = [
  require('./user.js'),
  require('./file_stats.js'),
  require('./user_verification.js'),
  require('./property.js'),
  require('./room.js'),
  require('./room_type.js'),
  require('./utility_provider.js'),
  require('./property_info.js'),
  require('./property_profile'),
  require('./bathroom_provider'),
  require('./bedroom_provider'),
  require('./energy_provider'),
  require('./kitchen_provider'),
  require('./telecom_provider'),
  require('./additional_feature_provider')

];

// Initialize models
modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  db[model.name] = model;
});

// Apply associations
Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
