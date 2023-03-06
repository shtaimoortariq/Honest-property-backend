"use strict";
const { v4: uuid } = require("uuid");
module.exports = (sequelize, DataTypes) => {
	const AdditionalFeature = sequelize.define("AdditionalFeature", {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	AdditionalFeature.beforeCreate((AdditionalFeature, _) => {
		return (AdditionalFeature.id = uuid());
	});

	return AdditionalFeature;
};
