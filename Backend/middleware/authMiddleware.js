import jwt from "jsonwebtoken";
import 'dotenv/config'


export const isAuthenticatedUser = async (req, res, next) => {

    try {
        // console.log('Cookies:', req.cookies);
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return next(new Error("Please Login to access this resource"))
        }
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
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