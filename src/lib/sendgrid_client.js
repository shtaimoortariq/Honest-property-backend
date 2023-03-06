// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
'use strict';
const sgMail = require('@sendgrid/mail');

class SendgridClient {

    static sendMail(data) {
        let {email, template, subject} = data;
        const mailOptions = {
                "from": "noreply@honest.properties",
                "to": email,
                subject,
                "html": template
            };

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail.send(mailOptions)
            .then(res => {
                // console.log(`${email}.sendMail() Success`, res);
            })
            .catch(err => {
                console.log(`${email}.sendMail() Error `, err);
            });
    }
}

module.exports = SendgridClient;