const models = require("../models");

const bathroomProviderController = {
	add: (req, res) => {
		let { name, value } = req.body;

		models.BathroomProvider.create({ name, value })
			.then((bathroomProvider) => {
				res.json({ success: true, content: bathroomProvider });
			})
			.catch((err) => {
				// console.log(err)
				res.status(500).json({ success: false, message: "Failed to add bathroom provider" });
			});
	},
	listAll: (req, res) => {
		models.BathroomProvider.findAll()
			.then((bathroomProviders) => {
				res.json({
					success: true,
					content: bathroomProviders,
				});
			})
			.catch((err) => {
				// noticed you just logged to the console
				// this will make the route just load without a response
				res.status(500).json({ success: false, message: "Error loading bathroom providers" });
			});
	},
};

module.exports = bathroomProviderController;
