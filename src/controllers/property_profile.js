const models = require("../models");
const utils = require("../lib/utils");
const rest_response = require("../lib/rest_response");
const commonUtils = require("../utils/common");

const isDataValidAll = (data_array = []) => {
  return data_array.every((data) => commonUtils.isDataValid(data));
};
const isStringNonEmptyAll = (data_array = []) => {
  return data_array.every((data) => commonUtils.isStringNonEmpty(data));
};
const propertyProfileController = {
  createPropertyProfile: (req, res, next) => {
    const {
      property_id,
      bedrooms,
      bathrooms,
      kitchen,
      energy_provider,
      telecom_provider,
      garage,
      garden,
      terrace,
      balcony,
      basement,
      parking,
      description
    } = req.body;
    const response = rest_response();
    if (
      !(
        isStringNonEmptyAll([
          property_id,
          kitchen,
          energy_provider,
          telecom_provider,
        ]) &&
        isDataValidAll([
          property_id,
          bedrooms,
          bathrooms,
          kitchen,
          energy_provider,
          telecom_provider,
          garage,
          garden,
          terrace,
          balcony,
          basement,
          parking,
        ])
      )
    ) {
      response.errors.push("Please enter a valid data");
      response.success = false;
      return res.status(400).json(response);
    }
    models.Property.findOne({ where: { id: property_id } })
      .then((property) => {
        if (!property) {
          response.errors.push("Property not found");
          response.success = false;
          res.status(404).json(response);
        } else {
          models.PropertyProfile.findOne({ where: { property_id } }).then((property_profile) => {
            if (property_profile) {
              response.errors.push("Information already exists on this property");
              response.success = false;
              res.status(400).json(response);
            } else {
              const new_property_profile_values = {
                property_id,
                bedrooms,
                bathrooms,
                kitchen,
                energy_provider,
                telecom_provider,
                garage,
                garden,
                terrace,
                balcony,
                basement,
                parking,
                description: description || ''
              }
              models.PropertyProfile.create(new_property_profile_values)
                .then((property_profile) => {
                  response.success = true;
                  response.content = property_profile.dataValues
                  res.status(201).json(response);
                }).catch((err) => {
                  console.log("err 1 ===>", err)
                  next(err)
                })
            }
          }).catch((err) => {
            console.log("err 2 ===>", err)
            next(err)
          })
        }
      }).catch(err => {
        console.log("err 3 ===>", err)
        return next(err)
      })
  },

  updatePropertyProfile: (req, res, next) => {
    const {
      property_id,
      bedrooms,
      bathrooms,
      kitchen,
      energy_provider,
      telecom_provider,
      garage,
      garden,
      terrace,
      balcony,
      basement,
      parking,
      description,
      address,
      price_or_rent,
      ownership_status,
      date_moved_in,
    } = req.body;
    const response = rest_response();
    if (
      !(
        isStringNonEmptyAll([
          property_id,
          kitchen,
          energy_provider,
          telecom_provider,
        ]) &&
        isDataValidAll([
          property_id,
          bedrooms,
          bathrooms,
          kitchen,
          energy_provider,
          telecom_provider,
          garage,
          garden,
          terrace,
          balcony,
          basement,
          parking,
        ])
      )
    ) {
      response.errors.push("Please enter a valid data");
      response.success = false;
      return res.status(400).json(response);
    }
    models.Property.findOne({ where: { id: property_id } })
      .then((property) => {
        if (!property) {
          response.errors.push("Property not found");
          response.success = false;
          res.status(404).json(response);
        } else {
          models.PropertyProfile.findOne({ where: { property_id } })
            .then((property_profile) => {
              if (property_profile) {
                const new_property_profile_values = {
                  property_id,
                  bedrooms,
                  bathrooms,
                  kitchen,
                  energy_provider,
                  telecom_provider,
                  garage,
                  garden,
                  terrace,
                  balcony,
                  basement,
                  parking,
                  description,
                };
                const new_property_info_values = {
                  property_id,
                  address,
                  ownership_status,
                  date_moved_in: new Date(date_moved_in),
                  price_or_rent,
                };
                property_profile
                  .update(new_property_profile_values)
                  .then((property_profile) => {
                    models.PropertyInfo.findOne({ where: { property_id } })
                      .then((property_info) => {
                        property_info
                          .update(new_property_info_values)
                          .then(() => {
                            response.success = true;
                            response.content = {
                              property_info: property_info.dataValues,
                              property_profile: property_profile.dataValues,
                            };
                            res.status(201).json(response);
                          })
                          .catch((err) => {
                            console.log("err 1 ===>", err)
                            next(err);
                          });
                      })
                      .catch((err) => {
                        console.log("err 2 ==>", err)
                        next(err);
                      });
                  })
                  .catch((err) => {
                    console.log("err 3 ==>", err)
                    next(err);
                  });
              } else {
                const new_property_info_values = {
                  property_id,
                  address,
                  ownership_status,
                  date_moved_in: new Date(date_moved_in),
                  price_or_rent,
                };
                models.PropertyInfo.create(new_property_info_values)
                  .then((property_info) => {
                    const new_property_profile_values = {
                      property_id,
                      bedrooms,
                      bathrooms,
                      kitchen,
                      energy_provider,
                      telecom_provider,
                      garage,
                      garden,
                      terrace,
                      balcony,
                      basement,
                      parking,
                      description,
                    };
                    models.PropertyProfile.create(new_property_profile_values)
                      .then((property_profile) => {
                        response.success = true;
                        response.content = {
                          property_info: property_info.dataValues,
                          property_profile: property_profile.dataValues,
                        };
                        res.status(201).json(response);
                      })
                      .catch((err) => {
                        console.log("err 1 ---<", err)
                        next(err);
                      });
                  })
                  .catch((err) => {
                    console.log("err 2 ---<", err)
                    next(err);
                  });
              }
            })
            .catch((err) => {
              console.log("err 3 ==>", err)
              next(err);
            });
        }
      })
      .catch((err) => {
        console.log("err 3 ==>", err)
        return next(err);
      });
  },
};
module.exports = propertyProfileController;
