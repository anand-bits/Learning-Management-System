import User from "../models/user.models.js";
import AppError from "../utils/error.utils.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
};

const register = async (req, res, next) => {
    
    try{
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError("User already exists. Please provide a different email.", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: "https://res.cloudinary.com",
        },
    });

    if (!user) {
        return next(new AppError("User registration failed. Please try again.", 400));
    }

    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOptions);

    await user.save();
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: "User registered successfully",
        user,
    });
}
catch(err){
    return next(new AppError(err.message),400)
}
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Email or password does not match", 400));
        }

        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie('token', token, cookieOptions);
        console.log(token);
        res.status(200).json({
            success: true,
            message: "User is logged in successfully",
        });
    } catch (err) {
        return next(new AppError(err.message, 400));
    }
};

const logout = (req, res) => {
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User is Logged Out Successfully"
    })


};

const getProfile = (req, res) => {
    
};

export {
    register,
    login,
    logout,
    getProfile,
};
