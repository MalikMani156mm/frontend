import OTP from "../models/OTPSchema.js";
import User from "../models/UserSchema.js";
import Admin from "../models/AdminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import CNIC from "../models/CNICSchema.js";
import { sendMail } from "../middleware/sendEmail.js";
import mobileOtpGenerator from "otp-generator";
import twilio from "twilio";
import randomstring from 'randomstring';
import { generateOtpHtmlTemplate, LoginHtmlTemplate, sendResetPasswordLinkHtmlTemplate } from '../Utils/htmlTemplate.js'
import {otpValidator} from '../Utils/otpValidator.js';
const accountSSID = process.env.TWILIO_AUTH_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSSID, authToken);

export const RegisterNewUser = async function (req, res, next) {
    
    try {
        const randomString = randomstring.generate();
        const mobileOTP = mobileOtpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        let newUser = req.body;
        const phoneNumber = process.env.PHONE_NUMBER;
        const htmlTemplate = generateOtpHtmlTemplate(newUser.name, randomString);

        const [validCNIC, existingUser] = await Promise.all([
            CNIC.findOne({ cnic: newUser.cnic }),
            User.findOne({
                $or: [
                    { email: newUser.email },
                    { phonenumber: newUser.phonenumber },
                    { cnic: newUser.cnic }
                ]
            })
        ]);

        if (!validCNIC) {
            return next(new Error("Invalid CNIC, please provide Nadra verified CNIC"));
        }

        if (existingUser) {
            if (existingUser.email === newUser.email) {
                return next(new Error("Duplicate Email Enter"));
            }
            if (existingUser.phonenumber === newUser.phonenumber) {
                return next(new Error("Duplicate Phonenumber Enter"));
            }
            if (existingUser.cnic === newUser.cnic) {
                return next(new Error("Duplicate CNIC Enter"));
            }
        }

        newUser.password = await bcrypt.hash(newUser.password, 10);

        const currentDate = new Date();

        const userPromise = OTP.findOneAndUpdate(
            { email: newUser.email },
            {
                otp: mobileOTP,
                otpExpiration: new Date(currentDate.getTime()),
                token: randomString,
                name: newUser.name,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
                cnic: newUser.cnic,
                password: newUser.password,
                Location:newUser.Location
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        const smsPromise = twilioClient.messages.create({
            body: `Your mobile otp is ${mobileOTP}`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        const emailPromise = sendMail(newUser.email, "Welcome to E-FIR System", "", htmlTemplate);

        const [user] = await Promise.all([userPromise, smsPromise, emailPromise]);

        res.json({
            user,
            success: true,
            message: "Confirmation mail is sent to your email account and please check it for further processing."
        });
    } catch (error) {
        next(error);
    }
}

export const VerifySignUp = async function (req, res, next) {
    try {
        const { mobileOTP } = req.body;
        const resetToken = req.query.resetToken;
        const userData = await OTP.findOne({ token: resetToken });
        if (!userData) {
            return next(new Error("You are using fabricated link. Please check it again!"));
        } else {
            if (mobileOTP === userData.otp) {
               const isOTPExpired = await otpValidator(userData.otpExpiration);
               if (isOTPExpired) {
                return next(new Error("Your OTP has been expired!"));
               }
               const name=userData.name;
               const email=userData.email;
               const cnic=userData.cnic;
               const phonenumber=userData.phonenumber;
               const password=userData.password;
               const role = userData.role;
               const Location = userData.Location;

            const user = new User({
                name,
                email,
                cnic,
                phonenumber,
                password,
                role,
                Location
            }) ;
                await user.save();
                await OTP.findByIdAndDelete(userData._id)
               const token = jwt.sign({ payload: user }, process.env.JWT_SECRET, { expiresIn: '24h' });
               res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).status(200).json({
                user,
                token,
                success: true,
                message: 'Your OTP is right!!!'
            })
            } else {
                return next(new Error("Ooops!!! You enter wrong OTP."));
            }

        }

    } catch (error) {
        next(error)
    }
}

export const SendOTPAgain = async function (req, res, next) {
    try {
        const phoneNumber = process.env.PHONE_NUMBER;
        const resetToken = req.query.resetToken;
        const userData = await OTP.findOne({ token: resetToken });
        if (!userData) {
            return next(new Error("You are using fabricated link. Please check it again!"));
        } else {
            await twilioClient.messages.create({
                body: `Your mobile otp is ${userData.otp}`,
                to: phoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER
            });
        }
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

        const currentDate = new Date();
        const htmlTemplate = LoginHtmlTemplate(user.name,currentDate)
        sendMail(user.email, "WelcomeBack to E-FIR System", "", htmlTemplate)

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

export const ForgetPasswordCNICConfirmation = async function (req, res, next) {
    try {
        const newUser = req.body;
        const validUser = await User.findOne({ cnic: newUser.cnic })
        if (!validUser) {
            return next(new Error("Invalid CNIC, user with such CNIC does not exist"))
        } else {
            const randomString = randomstring.generate();
            await User.updateOne({ email: validUser.email }, { $set: { resetToken: randomString } })
            const htmlLinkTemplate = sendResetPasswordLinkHtmlTemplate(validUser.name, randomString);
            sendMail(validUser.email, "Reset Password Link of E-FIR account", "", htmlLinkTemplate)
        }
        res.json({
            User: validUser,
            success: true,
            message: 'We sent a mail to your account please check it and reset your password'
        })
    } catch (error) {
        next(error)
    }
}

export const ResetPassword = async function (req, res, next) {
    try {
        const resetToken = req.query.resetToken;
        const userData = await User.findOne({ resetToken: resetToken });
        if (!userData) {
            return next(new Error("The Link is expired!!!"))
        } else {
            const Password = req.body.password;
            const password = await bcrypt.hash(Password, 10);
            const user = await User.findByIdAndUpdate({ _id: userData._id }, { $set: { password: password, resetToken: '' } }, { new: true })
            const token = jwt.sign({ payload: user }, process.env.JWT_SECRET, { expiresIn: '24h' })

            res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).status(200).json({
                user,
                token,
                success: true,
                message: 'Your Password is reset!!!'
            })
        }
    } catch (error) {
        next(error)
    }
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
            filteredUsers = await User.find({ name: { $regex: search, $options: "i" } }).select("-password");
        }

        res.json(filteredUsers);
    } catch (error) {
        next(error)
    }
}