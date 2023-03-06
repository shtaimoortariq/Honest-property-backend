const models = require("../models");

const bedroomProviderController = {
	add: (req, res) => {
		let { name, value } = req.body;
		console.log("name", name);
		console.log("value", value);
		models.BedroomProvider.create({ name, value })
			.then((bedroomProvider) => {
				res.json({ success: true, content: bedroomProvider });
			})
			.catch((err) => {
				// console.log(err)
				res.status(500).json({ success: false, message: "Failed to add bedroom provider" });
			});
	},
	listAll: (req, res) => {
		models.BedroomProvider.findAll()
			.then((bedroomProviders) => {
				res.json({
					success: true,
					content: bedroomProviders,
				});
			})
			.catch((err) => {
				// noticed you just logged to the console
				// this will make the route just load without a response
				res.status(500).json({ success: false, message: "Error loading bedroom providers" });
			});
	},
};

module.exports = bedroomProviderController;
