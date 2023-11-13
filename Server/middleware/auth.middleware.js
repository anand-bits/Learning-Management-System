// auth.middleware.js

import Jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";
import { config } from 'dotenv';
config()


const isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const { token } = req.cookies;
        console.log(token);
        


        if (!token) {
            return next(new AppError("Unauthenticated User, Please Login again !!!", 401));
        }
        

        // Debug: Log the received token
        console.log("Received Token:", token);

        const userDetails =  await Jwt.verify(token, process.env.JWT_SECRET);

        // Debug: Log the decoded user details
        console.log("Decoded User Details:", userDetails);

        req.user = userDetails;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return next(new AppError("Unauthenticated User, Please Login again !!!", 401));
    }
};



const authorizedRoles=(...roles)=> async (req,res,next)=>
{
    const currentUserRoles= req.user.role;
     if(!roles.includes(currentUserRoles))
     {
        return next(new AppError("You do not have permission to access the rounter"),400)
     }

     next();

}
// Middleware to check if user has an active subscription or not
 const authorizeSubscribers = async (req, _res, next) => {
    // If user is not admin or does not have an active subscription then error else pass
    if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
  };

export { isLoggedIn ,
authorizedRoles,authorizeSubscribers};
