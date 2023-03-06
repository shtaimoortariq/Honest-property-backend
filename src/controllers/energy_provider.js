const models = require("../models");

const energyProviderController = {
	add: (req, res) => {
		let { name, value } = req.body;

		models.EnergyProvider.create({ name, value })
			.then((energyProvider) => {
				res.json({ success: true, content: energyProvider });
			})
			.catch((err) => {
				// console.log(err)
				res.status(500).json({ success: false, message: "Failed to add energy provider" });
			});
	},
	listAll: (req, res) => {
		models.EnergyProvider.findAll()
			.then((energyProviders) => {
				res.json({
					success: true,
					content: energyProviders,
				});
			})
			.catch((err) => {
				// noticed you just logged to the console
				// this will make the route just load without a response
				res.status(500).json({ success: false, message: "Error loading energy providers" });
			});
	},
};

module.exports = energyProviderController;
