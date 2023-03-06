const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

module.exports = (passport) => {
	// Redirect the user to Google for authentication.  When complete,
	// Google will redirect the user back to the application at
	// /auth/google/callback
	router.get("/google", (req, res, next) => {
		passport.authenticate("google", { scope: ["openid", "profile", "email", "https://www.googleapis.com/auth/drive.file"] })(req, res, next);
	});

	// Google will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	router.get(
		"/google/callback",
		(req, res, next) => {
			passport.authenticate("google")(req, res, next);
		},
		userController.GoogleSignin
	);

	return router;
};
