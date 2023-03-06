'use strict';
const signedUp = (appURL, userInfo, userProfileInfo) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; width: 100%; height: 100%; margin: 0; padding: 0; background: #f1f1f1;">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Verify your email address</title>
            <!--[if gte mso 15]>
                    <style type="text/css">
                        table {
                            font-size: 1px;

                            mso-margin-top-alt: 1px;
                            mso-line-height-rule: exactly;
                        }
                        * {
                            mso-line-height-rule: exactly;
                        }
                    </style>
                    <![endif]-->

            <!--[if mso]>
                    <style type="text/css">
                        body,
                        table,
                        td {
                            font-family: Arial, Helvetica, sans-serif !important;
                        }
                    </style>
                    <![endif]-->

            <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->

            <style>
                @media (max-width: 600px) {
                .message-container {
                width: 100% !important;
                }

                .message-body {
                padding: 25px !important;
                border: none !important;
                }

                .message-string {
                font-size: 14px !important;
                }

                .profile-image {
                width: 30px !important;
                height: 30px !important;
                }
                }
            </style>


            <style>
                a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                }

            #outlook a {
                padding: 0;
                }

                .yshortcuts a {
            border-bottom: none !important;
                }

                .ExternalClass {
                width: 100%;
                }

                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
            line-height: 100%;
                }
            </style>
            <style>
                @media (max-width: 600px) {
                .body-table-spacing {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                }

                img {
                max-width: 100%;
                height: auto !important;
                }

                .container {
                width: 100% !important;
                }

                .container td:not(.override-resize) {
                width: 100% !important;
                display: block;
                box-sizing: border-box;
                }

                .column-1.first,
                .column-2.first,
                .column-3.first,
                .column-4.first,
                .column-5.first,
                .column-6.first,
                .column-7.first,
                .column-8.first,
                .column-9.first,
                .column-10.first,
                .column-11.first,
                .column-12.first {
                padding-left: 0px !important;
                }

                .column-1.last,
                .column-2.last,
                .column-3.last,
                .column-4.last,
                .column-5.last,
                .column-6.last,
                .column-7.last,
                .column-8.last,
                .column-9.last,
                .column-10.last,
                .column-11.last,
                .column-12.last {
                padding-right: 0px !important;
                }

                .hero {
                height: auto !important;
                padding-top: 0px;
                padding-right: 0px;
                padding-bottom: 0px;
                padding-left: 0px;
                }

                .hero__inner {
                height: auto !important;
                }

                .hero__inner>table {
                width: 100% !important;
                }
                table {border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; table-layout: fixed;}
                table table { table-layout: auto; }
                }
            </style>
        </head>

        <body style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #444; width: 100%; height: 100%; margin: 0; padding: 0; background: #f1f1f1; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table id="body-table" width="100%" border="0" cellpadding="0" cellspacing="0" style="color: #444; margin: 0; padding: 0; background: #f1f1f1; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; width: 100%; height: 100%; line-height: 100%;">
                <tr>
                    <td class="body-table-spacing"  valign="top" style="font-size: 16px; color: #444; border-collapse: collapse; text-align: left; padding-top: 20px; padding-bottom: 20px; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        <table class="container" width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="color: #444; width: 600px; margin: 0 auto 0 auto; background: #fff; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; table-layout: fixed;">
                            <tr>
                                <td class="column-12 first last" style="font-size: 16px; color: #444; border-collapse: collapse; text-align: left; width: 600px; padding-left: 0px; padding-right: 0px; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" >
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="color: #444; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0 auto;" align="left">
                                        <tr>
                                            <td style="font-size: 16px; color: #444; border-collapse: collapse; text-align: left; padding: 45px 0px 35px 0px; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" >
                                                <a href="https://www.overflo.io" target="_blank">
                                                    <img src="${appURL}/img/logo.png" width="188" style="vertical-align: top; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" border="0"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="color: #444; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0 auto;" align="left" width="90%">
                                        <tr>
                                            <td style="font-size: 16px; color: #444; border-collapse: collapse; text-align: left; padding: 5px 0px; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" >
                                                Hey Team,
                                                <br>
                                                    <br><br>
                                                        <span style="font-size: 12px;">
                                                            A new user signed up with the following information:
                                                            <br><br>
                                                            First Name: ${userInfo.user_data.first_name}
                                                            <br><br>
                                                            Last Name: ${userInfo.user_data.last_name}
                                                            <br><br>
                                                            Email: ${userInfo.user_data.email_id}
                                                            <br><br>
                                                            Usage role: ${userInfo.user_data.usage_role}
                                                            <br><br>
                                                            Facebook login: ${userInfo.user_data.google_login}
                                                            <br><br>
                                                            Wizard Info: <pre>${JSON.stringify(userProfileInfo, null, '\t')}</pre>
                                                        </span>
                                                        </td>
                                                    </tr>
                                                    </table>

                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="color: #444; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0 auto;" align="center">
                                                        <tr>
                                                            <td style="padding-bottom: 40px;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="60%" align="center" style="color: #444; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0 auto" align="center">
                                                                    <tr>
                                                                        <td style=" color: #444; border-collapse: collapse; text-align: center; font-size: 10px; padding-bottom: 5px; font-family: Tahoma, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" align="center">
                                                                            <a target="_blank" href="https://www.facebook.com/overflo/" style="color: #444; text-decoration: none;">
                                                                                <img src="${appURL}/img/icons/facebook.png" width="32" style="vertical-align: top; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none;"/>
                                                                            </a>
                                                                        &nbsp;
                                                                            <a target="_blank" href="https://www.linkedin.com/overflo/" style="color: #444; text-decoration: none;">
                                                                                <img src="${appURL}/img/icons/linkedin.png" width="32" style="vertical-align: top; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none;"/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>`

};
module.exports = signedUp;