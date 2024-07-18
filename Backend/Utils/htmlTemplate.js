export function generateOtpHtmlTemplate(newUser,token) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: #ffffff;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>OTP Verification</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>${newUser}</strong>,</p>
                    <p>Thank you for using our E-FIR system. Please use the following link to complete your verification process:</p>
                    <a href="http://localhost:3000/MobileOTP?resetToken=${token}" class="otp"> Click Here: </a>
                    <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
                    <p>If you did not request this OTP, please ignore this email.</p>
                    <p>Best regards,<br>Islamabad Police</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 E-FIR System. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export function sendResetPasswordLinkHtmlTemplate(validUser, resetToken) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: #ffffff;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reset Password</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>${validUser}</strong>,</p>
                    <p>Thank you for using our E-FIR system. Please use the following link to reser your password :</p>
                     <a href="http://localhost:3000/setNewPassword?resetToken=${resetToken}" class="otp"> Click Here: </a>
                    <p>This link is valid for a limited time. Please do not share it with anyone.</p>
                    <p>If you did not request this link, please ignore this email.</p>
                    <p>Best regards,<br>Islamabad Police</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 E-FIR System. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export function sendAdminResetPasswordLinkHtmlTemplate(validUser, resetToken) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: #ffffff;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reset Password</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>${validUser}</strong>,</p>
                    <p>Thank you for using our E-FIR system. Please use the following link to reser your password :</p>
                     <a href="http://localhost:3000/setAdminNewPassword?resetToken=${resetToken}" class="otp"> Click Here: </a>
                    <p>This link is valid for a limited time. Please do not share it with anyone.</p>
                    <p>If you did not request this link, please ignore this email.</p>
                    <p>Best regards,<br>Islamabad Police</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 E-FIR System. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
