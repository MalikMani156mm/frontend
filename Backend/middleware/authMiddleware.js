import jwt from "jsonwebtoken";
import 'dotenv/config'
import User from "../models/UserSchema.js";
import Admin from "../models/AdminSchema.js";


export const isAuthenticatedUser = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new Error("Unauthentic user , no token provided"))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return next(new Error("Unauthentic , invalid token provided"))
        }
        let user;

        user = await User.findById(decoded.payload).select("-password");
        if (!user) {
            user = await Admin.findById(decoded.payload).select("-password");
        }

        if (!user) {
            return next(new Error("Authentication failed ,user not found"))
        }
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }

}

export const isAuthorizedUser = (...roles) => {
    return (req, res, next) => {
        console.log(roles);
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(new Error(`You are not authorized, because ${req.user.role} will not access this resource`))
        }
        next();
    }

}