import User from "../models/UserSchema.js";
import Admin from "../models/AdminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import CNIC from "../models/CNICSchema.js";
import { sendMail } from "../middleware/sendEmail.js";
import emailOtpGenerator from "otp-generator";
import mobileOtpGenerator from "otp-generator";
import twilio from "twilio";
const accountSSID = process.env.TWILIO_AUTH_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSSID, authToken);

export const RegisterNewUser = async function (req, res, next) {

    try {
        const emailOTP = emailOtpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        const mobileOTP = mobileOtpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        let newUser = req.body;
        const phoneNumber = `+923008337310`;
        const htmlTemplate = `
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
                    <p>Dear <strong>${newUser.name}</strong>,</p>
                    <p>Thank you for using our E-FIR system. Please use the following One-Time Password (OTP) to complete your verification process:</p>
                    <p class="otp">${emailOTP}</p>
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
        const validCNIC = await CNIC.findOne({ cnic: newUser.cnic })
        if (!validCNIC) {
            return next(new Error("Invalid CNIC, please provide Nadra verified CNIC"))
        }

        newUser.password = await bcrypt.hash(newUser.password, 10);

        // await twilioClient.messages.create({
        //     body: `Your mobile otp is ${mobileOTP}`,
        //     to: phoneNumber,
        //     from: process.env.TWILIO_PHONE_NUMBER
        // });

        // sendMail(newUser.email, "Welcome to E-FIR System", "", htmlTemplate)
        const user = await User.create(req.body);
        const token = jwt.sign({ payload: user }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).status(200).json({
            user,
            token,
            success: true
        })
    } catch (error) {
        next(error)
    }
}

export const LoginUser = async function (req, res, next) {
    try {
        let { email, password } = req.body;

        if (!email) {
            return next(new Error("Please provide Email"))
        }

        if (!password) {
            return next(new Error("Please provide Password"))
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return next(new Error("Invalid credential, please create account or try again"))
        }

        const isPasswordMatched = await bcrypt.compare(password, user?.password);

        if (!isPasswordMatched) {
            return next(new Error("Your password is incorrect"))
        }

        const token = await jwt.sign({ payload: user }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV !== "development" }).status(200).json({
            user,
            token,
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const LogoutUser = async function (req, res, next) {
    res.cookie("token", "", { expires: new Date(Date.now()) }).json({
        success: true,
        Message: "logged out"
    })
}

export const ConfirmPassword = async function (req, res, next) {
    try {
        let { email, password } = req.body;

        if (!email) {
            return next(new Error("Please provide Email"))
        }

        if (!password) {
            return next(new Error("Please provide Password"))
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return next(new Error("Invalid user, user not find"))
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return next(new Error("Your password is incorrect"))
        }
        res.json({
            User: user,
            success: true,
            message: 'Password Match Successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const ChangePassword = async function (req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10)
        const UpdateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!UpdateUser) {
            return res.json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            uu: UpdateUser,
            message: 'Password is Change',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const ChangeUsername = async function (req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const UpdateUsername = await User.findByIdAndUpdate(id, data, { new: true });
        if (!UpdateUsername) {
            return res.json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            uu: UpdateUsername,
            message: 'Username is Change',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const getUserForSidebar = async function (req, res, next) {
    try {
        const search = req.query.search || "";
        let filteredUsers;

        if (req.user.role === "Citizen") {
            // filteredUsers = await Admin.find({name:{$regex:search, $options:"i"}}).select("-password");
            filteredUsers = await Admin.find({}).select("-password");
        } else {
            filteredUsers = await User.find({name:{$regex:search, $options:"i"}}).select("-password");
        }

        res.json( filteredUsers );
    } catch (error) {
        next(error)
    }
}