import jwt from "jsonwebtoken";
import 'dotenv/config'


export const isAuthorizedUser = ( req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return next(new Error("You are not authorized, Please Login to acces this resource"))
    }

    var {payload} = jwt.verify(token,process.env.JWT_SECRET)
    req.user= payload;
    next();
}