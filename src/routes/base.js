const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		responseData: JSON.stringify({ key1: "value1", key2: "value2" }),
	});
});

router.get("/google-api-test", (req, res) => {
	res.render("google-api");
});

router.get("/change-password", (req, res) => {
	res.render("change-password");
});

module.exports = (requireAuth) => {
	return router;
};
