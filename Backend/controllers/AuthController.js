import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export const RegisterNewUser = async function(req,res,next){
    
    try {
        let newUser = req.body;

        newUser.Password =  await bcrypt.hash( newUser.Password, 10)

        const user = await User.create(req.body)
        res.json([user,'user is created'])
    } catch (error) {
        next(error)
    }
}

export const LoginUser = async function(req,res,next){
    try {
        let {email,Password} = req.body;

        if (!email){
            return next(new Error("Please provide Email"))
        }

        if (!Password){
            return next(new Error("Please provide Password"))
        }

        const user = await User.findOne({email:email})

        if (!user){
            return next(new Error("Invalid credential, please create account or try again"))
        }

        const isPasswordMatched = await bcrypt.compare(Password,user.Password);

        if (!isPasswordMatched){
            return next(new Error("Your password is incorrect"))
        }

        const token = await jwt.sign({payload: user},process.env.JWT_SECRET,{expiresIn: 1 * 60 * 60})

        res.cookie('token', token, {expires: new Date(Date.now() + 9000000), httpOnly:true, secure:true}).status(200).json({
            user,
            token
        })
    } catch (error) {
        next(error)
    }
}

export const LogoutUser = async function(req,res,next){
    console.log('Logout');
}