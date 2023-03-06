const models = require("../models");

const kitchenProviderController = {
	add: (req, res) => {
		let { name, value } = req.body;

		models.KitchenProvider.create({ name, value })
			.then((kitchenProvider) => {
				res.json({ success: true, content: kitchenProvider });
			})
			.catch((err) => {
				// console.log(err)
				res.status(500).json({ success: false, message: "Failed to add kitchen provider" });
			});
	},
	listAll: (req, res) => {
		models.KitchenProvider.findAll()
			.then((kitchenProviders) => {
				res.json({
					success: true,
					content: kitchenProviders,
				});
			})
			.catch((err) => {
				// noticed you just logged to the console
				// this will make the route just load without a response
				res.status(500).json({ success: false, message: "Error loading kitchen providers" });
			});
	},
};

module.exports = kitchenProviderController;
