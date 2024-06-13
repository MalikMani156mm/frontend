import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export const RegisterNewUser = async function(req,res,next){
    
    try {
        let newUser = req.body;

        // console.log(newUser.email);

        newUser.password =  await bcrypt.hash( newUser.password, 10)

        const user = await User.create(req.body)
        // LoginUser(req.body);
        res.json({
            User: user,
            success: true,
            message:'User Registered Successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const LoginUser = async function(req,res,next){
    try {
        let {email,password} = req.body;

        if (!email){
            return next(new Error("Please provide Email"))
        }

        if (!password){
            return next(new Error("Please provide Password"))
        }

        const user = await User.findOne({email:email})

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

export const LogoutUser = async function(req,res,next){
    res.cookie("token", "", {expires: new Date( Date.now() )}).json({
        success: true,
        Message: "logged out"
    })
}