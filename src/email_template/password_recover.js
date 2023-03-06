"use strict";

const passwordForgot = (appUrl, firstName, link) => {
    return `
<!DOCTYPE>
<html>
    <head>
        <style>
            table {
                table-layout: fixed;
                color: #444;
                border-collapse: collapse;
            }

            td {
                color: #444;
            }

            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                max-width: 100%;
                display: block;
            }

            @media (max-width: 800px) {
                .container {
                    width: 100% !important;
                }
            }

            @media (max-width: 600px) {
                .main_logo {
                    width: 75% !important;
                }
            }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:100" rel="stylesheet">
    </head>
    <body>
        <table align="center" cellpadding="0" cellspacing="0" border="0" class="container" width="800" style="background: #ffffff; border: 1px solid #ccc;">
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" height="160" style="background: #fafafa;">
                        <tr>
                            <td>
                                <img class="main_logo" style="margin: auto;" border="0" src="http://www.duglz.com/v1/wp-content/uploads/2020/02/cropped-Converted-PNG.png" width="290">
                            </td>
                        </tr>
                    </table>
                    <table class="mobile-padding" cellpadding="0" cellspacing="0" border="0" width="100%" style="color: #444; font-family: 'Arial Narrow', 'Helvetica', Arial; font-weight: lighter; padding: 10%; font-size: 18px;">
                        <tr>
                            <td style="padding: 8%;">
                                Hi ${firstName},
                                <br><br>
                                Looks like you forgot your password. No problem. Just click the button below and we’ll get you a new one.
                                <br><br>
                                <br>
                                <center>
                                    <div style="margin:auto">
                                        <a href=${link}
                                        style="background-color:#963F37;border-radius:2px;color:#ffffff;
                                        display:inline-block;font-family:'Arial Narrow', Arial, sans-serif;
                                        font-size:18px;line-height:55px;text-align:center;text-decoration:none;
                                        width:200px;-webkit-text-size-adjust:none;">Reset Password</a>
                                    </div>
                                </center>
                                <br><br>
                                If you don’t want to reset your password you can just ignore this email.
                                <br><br>
                                Thanks,
                                <br><br>
                                <strong style="text-transform: uppercase;">Honest Properties Team</strong>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`
};

module.exports = passwordForgot;
