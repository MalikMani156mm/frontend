import Admin from "../models/AdminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import randomstring from 'randomstring';
import { sendMail } from "../middleware/sendEmail.js";
import 'dotenv/config'
import { sendAdminResetPasswordLinkHtmlTemplate } from "../Utils/htmlTemplate.js";

export const RegisterNewAdmin = async function(req,res,next){
    
    try {
        let newUser = req.body;


        newUser.password =  await bcrypt.hash( newUser.password, 10)

        const admin = await Admin.create(req.body)
        
        res.json({
            Admins: admin,
            success: true,
            message:'Admin Registered Successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const LoginAdmin = async function(req,res,next){
    try {
        let {email,password} = req.body;

        if (!email){
            return next(new Error("Please provide Email"))
        }

        if (!password){
            return next(new Error("Please provide Password"))
        }

        const user = await Admin.findOne({email:email})

        if (!user){
            return next(new Error("Invalid credential, please create account or try again"))
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if (!isPasswordMatched){
            return next(new Error("Your password is incorrect"))
        }

        const token = await jwt.sign({payload: user},process.env.JWT_SECRET,{ expiresIn: '24h' })

        res.cookie("token", token, {expires: new Date(Date.now() + 86400000)}).status(200).json({
            user,
            token,
            success:true
        })
        
    } catch (error) {
        next(error)
    }
}

export const LogoutAdmin = async function(req,res,next){
    res.cookie("token", "", {expires: new Date( Date.now() )}).json({
        success: true,
        Message: "logged out"
    })
}
export const ConfirmAdminPassword = async function (req, res, next) {
    try {
        let { email, password } = req.body;

        if (!email) {
            return next(new Error("Please provide Email"))
        }

        if (!password) {
            return next(new Error("Please provide Password"))
        }

        const user = await Admin.findOne({ email: email })

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
export const ChangeAdminPassword = async function (req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10)
        const UpdateUser = await Admin.findByIdAndUpdate(id, req.body,{ new: true });
        if (!UpdateUser) {
            return res.json({
                message: 'Admin not found',
                success: false
            });
        }
        res.json({
            uu:UpdateUser,
            message: 'Password is Change',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const ForgetPasswordEmailConfirmation = async function (req, res, next) {
    try {
        const newUser = req.body;
        const validUser = await Admin.findOne({ email: newUser.email })
        if (!validUser) {
            return next(new Error("Invalid email, user with such email does not exist"))
        } else {
            const randomString = randomstring.generate();
            await Admin.updateOne({ email: validUser.email }, { $set: { resetToken: randomString } })
            const htmlLinkTemplate = sendAdminResetPasswordLinkHtmlTemplate(validUser.name, randomString);
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

export const ResetAdminPassword = async function (req, res, next) {
    try {
        const resetToken = req.query.resetToken;
        const userData = await Admin.findOne({ resetToken: resetToken });
        if (!userData) {
            return next(new Error("The Link is expired!!!"))
        } else {
            const Password = req.body.password;
            const password = await bcrypt.hash(Password, 10);
            const user = await Admin.findByIdAndUpdate({ _id: userData._id }, { $set: { password: password, resetToken: '' } }, { new: true })
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

export const ChangeAdminName = async function (req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const token = req.cookies.token;
        const UpdateName = await Admin.findByIdAndUpdate(id, data, { new: true });
        if (!UpdateName) {
            return res.json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            user: UpdateName,
            token,
            message: 'Name is Changed',
            success: true
        })

    } catch (error) {
        next(error)
    }
}