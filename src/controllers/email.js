"use strict";
const SendgridClient = require("../lib/sendgrid_client"),
	passwordRecoverTemplate = require("../email_template/password_recover");

const EmailController = {
	sendPasswordRecoverEmail(appURL, email, firstName, resetLink) {
		let subject = "Reset Password",
			template = passwordRecoverTemplate(appURL, firstName, resetLink);

		return SendgridClient.sendMail({ email, template, subject });
	},
};

module.exports = EmailController;
