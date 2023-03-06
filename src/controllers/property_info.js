const { v4: uuid } = require("uuid");
const models = require("../models");
const utils = require("../lib/utils");
const rest_response = require("../lib/rest_response");
const commonUtils = require("../utils/common");

const propertyInfoController = {
	createPropertyInfo: (req, res, next) => {
		const { property_id, address, ownership_status, date_moved_in, price_or_rent } = req.body;
		const response = rest_response();
		// Validating body for undefined, empty strings...
		if (
			!(commonUtils.isStringNonEmpty(address) && commonUtils.isDataValid(address)) ||
			!(commonUtils.isStringNonEmpty(ownership_status) && commonUtils.isDataValid(ownership_status)) ||
			!(commonUtils.isStringNonEmpty(date_moved_in) && commonUtils.isDataValid(date_moved_in) && commonUtils.isDate(date_moved_in)) ||
			!(commonUtils.isStringNonEmpty(price_or_rent) && commonUtils.isDataValid(price_or_rent) && !isNaN(parseFloat(price_or_rent)))
		) {
			response.success = false;
			response.errors.push("Please provide valid data");
			return res.status(400).json(response);
		}

		const current_user = utils.getPayload(req.headers.authorization);
		if (!current_user) {
			response.success = false;
			response.errors.push("cannot get user details");
			return res.status(404).json(response);
		}

		// Checking if property_id is atached to request body
		if (commonUtils.isStringNonEmpty(property_id) && commonUtils.isDataValid(property_id)) {
			// check if property info exists on the property_id already
			models.PropertyInfo.findOne({ where: { property_id: property_id } })
				.then((property_info) => {
					if (property_info) {
						response.success = false;
						response.errors.push("Information already exists on this property");
						res.status(400).json(response);
					} else {
						models.Property.findOne({
							where: { id: property_id },
						})
							.then((property) => {
								if (!property) {
									response.success = false;
									response.errors.push("Cannot find property!");
									res.status(404).json(response);
								} else {
									const new_property_info_values = {
										property_id: property_id,
										address,
										ownership_status,
										date_moved_in: new Date(date_moved_in),
										price_or_rent,
									};
									// create property info
									models.PropertyInfo.create(new_property_info_values)
										.then((property_info) => {
											response.success = true;
											response.content = property_info.dataValues;
											res.status(201).json(response);
										})
										.catch((err) => {
											next(err);
										});
								}
							})
							.catch((err) => {
								next(err);
							});
					}
				})
				.catch((err) => {
					return next(err);
				});
		} else {
			// creating new property if property_id is not attached
			const new_property_values = {
				id: uuid(),
				property_address: address,
				user_id: current_user.id,
			};
			models.Property.create(new_property_values)
				.then((property) => {
					const new_property_info_values = {
						property_id: property.dataValues.id,
						address,
						ownership_status,
						date_moved_in: new Date(date_moved_in),
						price_or_rent,
					};
					return models.PropertyInfo.create(new_property_info_values);
				})
				.then((property_info) => {
					response.success = true;
					response.content = property_info.dataValues;
					res.status(201).json(response);
				})
				.catch((err) => {
					console.log(err);
					return next(err);
				});
		}
	},
	updatePropertyInfo: (req, res, next) => {
		const { address, ownership_status, date_moved_in, price_or_rent } = req.body;
		const property_info_id = req.query.property_info_id;
		const response = rest_response();
		// Validating body for undefined, empty strings...
		if (
			!(commonUtils.isStringNonEmpty(address) && commonUtils.isDataValid(address)) ||
			!(commonUtils.isStringNonEmpty(ownership_status) && commonUtils.isDataValid(ownership_status)) ||
			!(commonUtils.isStringNonEmpty(date_moved_in) && commonUtils.isDataValid(date_moved_in) && commonUtils.isDate(date_moved_in)) ||
			!(commonUtils.isStringNonEmpty(price_or_rent) && commonUtils.isDataValid(price_or_rent) && !isNaN(parseFloat(price_or_rent))) ||
			!(commonUtils.isStringNonEmpty(property_info_id) && commonUtils.isDataValid(property_info_id))
		) {
			response.success = false;
			response.errors.push("Please provide valid data");
			return res.status(400).json(response);
		}

		models.PropertyInfo.findOne({ where: { id: property_info_id } })
			.then((property_info) => {
				if (!property_info) {
					response.success = false;
					response.errors.push("Not found");
					res.status(404).json(response);
				} else {
					const property_info_update_values = {
						address,
						ownership_status,
						price_or_rent,
					};
					property_info
						.update(property_info_update_values)
						.then((updated_value) => {
							response.success = true;
							response.content = updated_value.dataValues;
							res.status(200).json(response);
						})
						.catch((err) => {
							next(err);
						});
				}
			})
			.catch((err) => {
				return next(err);
			});
	},
	getPropertyInfoByPropertyId: (req, res, next) => {
		const property_id = req.query.property_id;
		const response = rest_response();
		if (
			!(
				commonUtils.isStringNonEmpty(property_id) &&
				commonUtils.isDataValid(property_id)
			)
		) {
			response.success = false;
			response.errors.push("Please property id");
			return res.status(400).json(response);
		}
		models.PropertyInfo.findOne({ where: { property_id } })
			.then((property_info) => {
				if (!property_info) {
					response.success = false;
					response.errors.push("Not found");
					res.status(404).json(response);
				} else {
					response.success = true;
					response.content = property_info.dataValues;
					res.status(200).json(response);
				}
			})
			.catch((err) => {
				return next(err);
			});
	},
	getPropertyDetails: (req, res, next) => {
		const property_id = req.query.property_id;
		const response = rest_response();
		if (
			!(
				commonUtils.isStringNonEmpty(property_id) &&
				commonUtils.isDataValid(property_id)
			)
		) {
			response.success = false;
			response.errors.push("Please provide property id");
			return res.status(400).json(response);
		}
		models.Property.findOne({ where: { id: property_id } }).then((property_details) => {
			models.PropertyInfo.findOne({ where: { property_id } }).then((property_info_details) => {
				models.PropertyProfile.findOne({ where: { property_id } }).then((property_profile_details) => {
					if (!property_details) {
						response.success = false;
						response.errors.push("Property not found");
						return res.status(400).json(response);
					} else {
						response.success = true;
						const responseData = { ...property_details.dataValues };
						responseData.property_info = property_info_details;
						responseData.property_profile = property_profile_details;
						response.content = responseData;
						return res.status(200).json(response);
					}
				}).catch(err => {
					next(err);
				});
			}).catch(err => {
				next(err);
			});
		}).catch(err => {
			return next(err);
		});
	}
};
module.exports = propertyInfoController;
