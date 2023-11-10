// auth.middleware.js

import Jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            console.log("Not getting error")
            return next(new AppError("Unauthenticated User, Please Login again !!!", 401));
        }

        // Debug: Log the received token
        console.log("Received Token:", token);

        const userDetails = await Jwt.verify(token, process.env.JWT_SECRET);

        // Debug: Log the decoded user details
        console.log("Decoded User Details:", userDetails);

        req.user = userDetails;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return next(new AppError("Unauthenticated User, Please Login again !!!", 401));
    }
};

export { isLoggedIn };
