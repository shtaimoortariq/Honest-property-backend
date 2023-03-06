const models = require("../models");

const additionalFeatureProviderController = {
	add: (req, res) => {
		let { name } = req.body;

		models.AdditionalFeature.create({ name })
			.then((additionalFeature) => {
				res.json({ success: true, content: additionalFeature });
			})
			.catch((err) => {
				// console.log(err)
				res.status(500).json({ success: false, message: "Failed to add additional feature provider" });
			});
	},
	listAll: (req, res) => {
		models.AdditionalFeature.findAll()
			.then((additionalFeature) => {
				res.json({
					success: true,
					content: additionalFeature,
				});
			})
			.catch((err) => {
				// noticed you just logged to the console
				// this will make the route just load without a response
				res.status(500).json({ success: false, message: "Error loading additional feature providers" });
			});
	},
};

module.exports = additionalFeatureProviderController;
