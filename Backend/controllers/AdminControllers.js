import Admin from "../models/AdminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'

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
            token
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